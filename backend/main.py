from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router

from app.database.db import engine
from app.models.user import User

# Create database tables
User.metadata.create_all(bind=engine)

app = FastAPI()

# =========================
# CORS MIDDLEWARE
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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