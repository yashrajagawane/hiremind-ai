from pydantic import BaseModel
from typing import List, Optional

class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str

class CareerMatchRequest(BaseModel):
    resume_text: str
    target_role: str
    experience_level: str

class InterviewPrepRequest(BaseModel):
    resume_text: str
    target_role: str
    experience_level: str

class CareerAnalyticsRequest(BaseModel):
    resume_text: str

class RewriteRequest(BaseModel):
    resume_text: str
    section: str
    text_to_rewrite: str
