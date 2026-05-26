from passlib.context import CryptContext

from jose import jwt

from datetime import datetime, timedelta



# =========================
# PASSWORD HASHING
# =========================
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



# =========================
# JWT CONFIG
# =========================
SECRET_KEY = "hiremind_secret_key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60



# =========================
# HASH PASSWORD
# =========================
def hash_password(password: str):

    return pwd_context.hash(password)



# =========================
# VERIFY PASSWORD
# =========================
def verify_password(
    plain_password,
    hashed_password
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )



# =========================
# CREATE JWT TOKEN
# =========================
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt