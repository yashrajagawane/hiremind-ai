"""
Response Cache — Phase 6 Production Polish

Uses an in-memory TTLCache (cachetools) to cache expensive Gemini AI responses.
This prevents hammering the AI API with identical requests and makes the
app feel significantly faster for repeated lookups (e.g., salary insights
for the same role).

Cache TTL: 1 hour (3600 seconds)
Max items: 500
"""

from cachetools import TTLCache
from functools import wraps
import hashlib
import json

# Shared cache — 500 entries, 1-hour TTL
_cache: TTLCache = TTLCache(maxsize=500, ttl=3600)


def _make_key(*args, **kwargs) -> str:
    """
    Build a stable cache key from any combination of positional and keyword args.
    Uses SHA-256 so long resume texts don't blow up memory as dictionary keys.
    """
    payload = json.dumps({"args": args, "kwargs": kwargs}, sort_keys=True, default=str)
    return hashlib.sha256(payload.encode()).hexdigest()


def cached_response(func):
    """
    Decorator: cache the return value of any sync function based on its arguments.

    Usage:
        @cached_response
        def generate_salary_insights(role, level, location): ...
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        key = _make_key(func.__name__, *args, **kwargs)
        if key in _cache:
            return _cache[key]
        result = func(*args, **kwargs)
        _cache[key] = result
        return result
    return wrapper
