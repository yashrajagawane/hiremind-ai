from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
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

try:
    connection = engine.connect()
    print("✅ Database Connected Successfully")
    connection.close()

except Exception as e:
    print("❌ Database Connection Failed")
    print(e)
    