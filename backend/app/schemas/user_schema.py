from pydantic import BaseModel


# =========================
# SIGNUP SCHEMA
# =========================
class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str


# =========================
# LOGIN SCHEMA
# =========================
class UserLogin(BaseModel):
    email: str
    password: str