from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.db import engine, Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    resume_histories = relationship("ResumeHistory", back_populates="user")

# NOTE: create_all is intentionally NOT called here.
# It is called once in main.py to avoid duplicate initialization.