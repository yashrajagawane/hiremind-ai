import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router

from app.database.db import engine
from app.models.user import User

# =========================
# CREATE DB TABLES
# Fix: create_all now only runs once here (removed duplicate from user.py)
# =========================
User.metadata.create_all(bind=engine)

app = FastAPI(
    title="HireMind AI",
    description="AI-Powered Resume Intelligence Platform",
    version="1.0.0"
)

# =========================
# CORS MIDDLEWARE
# Fix: allow_origins=["*"] + allow_credentials=True is blocked by browsers.
# Now using specific origin from FRONTEND_URL env variable.
# =========================
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        "message": "HireMind AI Backend Running Successfully 🚀"
    }