from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.db import Base

class ResumeHistory(Base):
    __tablename__ = "resume_histories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    filename = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    
    # Store the parsed text just in case we need it later
    resume_text = Column(String, nullable=False)
    
    # Store the analysis results as JSON
    analysis_data = Column(JSON, nullable=False)
    
    user = relationship("User", back_populates="resume_histories")
