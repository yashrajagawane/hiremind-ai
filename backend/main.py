import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Rate limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

load_dotenv()

from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router

from app.database.db import engine, Base
from app.models.user import User
from app.models.resume_history import ResumeHistory

# =========================
# CREATE DB TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# RATE LIMITER
# Default: 30 requests / minute per IP for AI endpoints
# =========================
limiter = Limiter(key_func=get_remote_address, default_limits=["30/minute"])

# =========================
# APP INSTANCE
# =========================
app = FastAPI(
    title="HireMind AI",
    description="AI-Powered Resume Intelligence Platform",
    version="1.0.0"
)

# Attach rate limiter state
app.state.limiter = limiter

# =========================
# CORS MIDDLEWARE
# Fix: specific origin from FRONTEND_URL env var — wildcard+credentials is blocked by browsers
# =========================
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiter middleware (must be after CORSMiddleware)
app.add_middleware(SlowAPIMiddleware)

# =========================
# GLOBAL ERROR HANDLERS
# =========================

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "error": "rate_limit_exceeded",
            "message": "Too many requests. Please slow down and try again shortly.",
            "retry_after": "60 seconds"
        }
    )


@app.exception_handler(404)
async def not_found_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=404,
        content={
            "error": "not_found",
            "message": f"The endpoint '{request.url.path}' does not exist."
        }
    )


@app.exception_handler(405)
async def method_not_allowed_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=405,
        content={
            "error": "method_not_allowed",
            "message": f"Method '{request.method}' is not allowed on '{request.url.path}'."
        }
    )


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_server_error",
            "message": "An unexpected error occurred. Our team has been notified."
        }
    )


@app.exception_handler(422)
async def validation_error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=422,
        content={
            "error": "validation_error",
            "message": "Invalid input. Please check all required fields and try again."
        }
    )

# =========================
# ROUTES
# =========================
app.include_router(auth_router)
app.include_router(resume_router)

# =========================
# HOME ROUTE
# =========================
@app.get("/")
def home():
    return {
        "message": "HireMind AI Backend Running Successfully 🚀",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.get("/health")
def health_check():
    """Lightweight health check endpoint for Render/deployment monitoring."""
    return {
        "status": "ok",
        "service": "hiremind-ai-backend"
    }