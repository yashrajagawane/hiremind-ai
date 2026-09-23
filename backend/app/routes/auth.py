from fastapi import APIRouter, HTTPException, Depends

from sqlalchemy.orm import Session

from app.schemas.user_schema import (
    UserCreate,
    UserLogin
)

from app.models.user import User

from app.database.db import get_db

from app.services.security import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================
# AUTH HOME
# =========================
@router.get("/")
def auth_home():

    return {
        "message": "Auth route working successfully 🔥"
    }


# =========================
# SIGNUP ROUTE
# Fix: Using Depends(get_db) — session is always closed after request
# =========================
@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    # Check existing user
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Create user
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message": "User created successfully 🚀",

        "user": {

            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email
        }
    }


# =========================
# LOGIN ROUTE
# Fix: Using Depends(get_db) — session is always closed after request
# =========================
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    # Find user
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    # User not found
    if not existing_user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify password
    valid_password = verify_password(
        user.password,
        existing_user.password
    )

    # Wrong password
    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # Create JWT token
    access_token = create_access_token(
        data={
            "sub": existing_user.email
        }
    )

    return {

        "message": "Login successful ✅",

        "access_token": access_token,

        "token_type": "bearer",

        "user": {

            "id": existing_user.id,
            "full_name": existing_user.full_name,
            "email": existing_user.email
        }
    }