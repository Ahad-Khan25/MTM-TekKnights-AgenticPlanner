"""Entry point: python main.py <messages-file>. Orchestration only."""
import copy, json, sys, time
import planner, reader, report, store, validator


def active(st):
    return {f["key"]: f for f in st["facts"] if f["status"] == "active"}


def apply_update(st, m, log):
    """Accept / ignore / REJECT one new message. Plan is changed on a copy and committed only if no check newly fails."""
    snap = copy.deepcopy({k: st[k] for k in ("facts", "messages", "plan")})
    F_old = active(st)
    old_checks = validator.validate(F_old, st["plan"], [])
    msg = store.add_message(st, m, log)
    F = store.resolve(st, log)
    changed = {f["seq"] for f in F.values() if f["key"] not in F_old or F_old[f["key"]]["seq"] != f["seq"]} | \
              {f["seq"] for f in F_old.values() if f["key"] not in F or F[f["key"]]["seq"] != f["seq"]}
    areas = set().union(*[planner.FACT_AREAS.get(store.area_of(st["facts"][s]), {"judging"}) for s in changed]) if changed else set()
    if not areas:
        log.append(f"msg {msg['id']}: no active fact changed (ignored/outdated); plan unchanged")
        return
    new = planner.plan(F, st["plan"], areas, log)
    checks = validator.validate(F, new, log)
    broke = [c for c, o in zip(checks, old_checks) if o["ok"] and not c["ok"]]
    if broke:
        for k, v in snap.items():
            st[k] = v
        msg = store.add_message(st, m, [])
        reason = "; ".join(f"{c['name']} would FAIL: {c['detail']}" for c in broke)
        for s in msg["facts"]:
            st["facts"][s]["status"] = "rejected"
        msg["status"], msg["reason"] = "REJECTED", reason
        log.append(f"msg {msg['id']} REJECTED: {reason}. Previous plan restored.")
    else:
        st["plan"] = new
        log.append(f"msg {msg['id']} ACCEPTED. Areas recomputed (code): {new['recomputed']}; Areas that made model calls: [reading]")


def main(path):
    t0 = time.time()
    text = reader.extract_file_text(path)
    st = store.load()
    log, start = [], len(st["trace"])
    new, hashes = store.new_text(st, text)
    if not new:
        log.append("no unseen messages (every line hash already in .state); plan unchanged, 0 model calls")
    else:
        msgs = reader.read(new, {f["key"] for f in st["facts"]}, st["trace"])
        if st["plan"] is None:
            log.append(f"empty state: full run, {len(msgs)} messages read in one batch call")
            for m in msgs:
                store.add_message(st, m, log)
            st["plan"] = planner.plan(store.resolve(st, log), log=log)
            log.append(f"Areas recomputed (code): {st['plan']['recomputed']}; Areas that made model calls: [reading]")
        else:
            for m in msgs:
                apply_update(st, m, log)
    st["seen"] = sorted(set(st["seen"]) | set(hashes))
    store.message_status(st)
    checks = validator.validate(active(st), st["plan"], log)
    st["decisions"].append({"run": len(st["decisions"]) + 1, "file": path, "entries": log})
    store.save(st)
    report.render(st, checks, start, log, time.time() - t0)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python main.py <path-to-messages-file>")
    main(sys.argv[1])
