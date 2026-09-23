from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from typing import Generator
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

try:
    connection = engine.connect()
    print("✅ Database Connected Successfully")
    connection.close()

except Exception as e:
    print("❌ Database Connection Failed")
    print(e)


# =========================
# DB DEPENDENCY (Fix: session leak)
# =========================
def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a DB session per request
    and guarantees it is closed after the request completes.
    Usage: db: Session = Depends(get_db)
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()