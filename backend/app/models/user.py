from sqlalchemy import Column, Integer, String
from app.database.db import engine
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

# NOTE: create_all is intentionally NOT called here.
# It is called once in main.py to avoid duplicate initialization.