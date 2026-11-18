"""Thin provider interface. Selected by env vars; token counts are copied from the provider response, never estimated.

LLM_PROVIDER = ollama | openai | anthropic   (openai = any OpenAI-compatible API, e.g. OpenRouter, Groq)
LLM_MODEL    = model name
LLM_BASE_URL = optional override
LLM_API_KEY  = key for openai/anthropic (falls back to GROQ_API_KEY / OPENAI_API_KEY / ANTHROPIC_API_KEY)
Default: Groq (OpenAI-compatible) with llama-3.1-8b-instant, a small 8B model.
"""
import json, os, time, urllib.request


def _load_dotenv(path=".env"):
    if os.path.exists(path):
        for line in open(path, encoding="utf-8"):
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.strip().split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"'))


_load_dotenv()
PROVIDER = os.getenv("LLM_PROVIDER", "openai")
MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")
KEY = os.getenv("LLM_API_KEY") or os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY") or os.getenv("ANTHROPIC_API_KEY", "")
BASE = os.getenv("LLM_BASE_URL") or {
    "ollama": "http://localhost:11434",
    "openai": "https://api.groq.com/openai/v1",
    "anthropic": "https://api.anthropic.com",
}[PROVIDER]


def _post(url, body, headers):
    req = urllib.request.Request(url, json.dumps(body).encode(), {"Content-Type": "application/json", **headers})
    with urllib.request.urlopen(req, timeout=100) as r:
        return json.loads(r.read())


def chat(system, user):
    """Returns dict(model, text, prompt_tokens, completion_tokens, total_tokens, seconds) from the real API response."""
    t = time.time()
    if PROVIDER == "ollama":
        r = _post(f"{BASE}/api/chat", {"model": MODEL, "stream": False, "format": "json", "options": {"temperature": 0},
                                        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}, {})
        text, p, c, model = r["message"]["content"], r.get("prompt_eval_count"), r.get("eval_count"), r.get("model", MODEL)
        tot = (p or 0) + (c or 0) if p is not None and c is not None else None
    elif PROVIDER == "anthropic":
        r = _post(f"{BASE}/v1/messages", {"model": MODEL, "max_tokens": 4000, "temperature": 0, "system": system,
                                          "messages": [{"role": "user", "content": user}]},
                  {"x-api-key": KEY, "anthropic-version": "2023-06-01"})
        u = r["usage"]
        text, p, c, model = r["content"][0]["text"], u["input_tokens"], u["output_tokens"], r.get("model", MODEL)
        tot = p + c  # Anthropic reports input/output only; total is their sum
    else:
        r = _post(f"{BASE}/chat/completions", {"model": MODEL, "temperature": 0, "response_format": {"type": "json_object"},
                                               "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]},
                  {"Authorization": f"Bearer {KEY}"})
        u = r["usage"]
        text, p, c, tot, model = r["choices"][0]["message"]["content"], u["prompt_tokens"], u["completion_tokens"], u["total_tokens"], r.get("model", MODEL)
    return {"model": model, "text": text, "prompt_tokens": p, "completion_tokens": c, "total_tokens": tot,
            "seconds": round(time.time() - t, 1)}


if __name__ == "__main__":
    print(chat("Reply in JSON.", 'Return {"ok": true}'))
