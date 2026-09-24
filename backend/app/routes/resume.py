from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

import shutil
import os

from app.services.resume_parser import parse_resume

from app.utils.skills import extract_skills

from app.utils.nlp_engine import (
    clean_text,
    extract_email,
    extract_phone,
    extract_education,
    extract_experience,
    extract_projects,
    extract_certifications,
)

from app.services.groq_ats import (
    generate_ai_ats_analysis
)

from app.services.groq_jd_analyzer import (
    analyze_resume_with_jd
)

from app.services.gemini_resume_review import (
    generate_resume_review
)

from app.services.gemini_career_match import (
    generate_career_match
)

from app.services.gemini_interview_prep import (
    generate_interview_prep
)

from app.services.gemini_career_analytics import (
    generate_career_analytics
)

from app.schemas.resume_schema import (
    JobMatchRequest,
    CareerMatchRequest,
    InterviewPrepRequest,
    CareerAnalyticsRequest,
    RewriteRequest,
    SalaryIntelligenceRequest
)

from sqlalchemy.orm import Session
from app.database.db import get_db

from app.middleware.auth_middleware import get_current_user
from app.models.user import User
from app.models.resume_history import ResumeHistory

from app.services.gemini_resume_rewrite import generate_rewrite
from app.services.gemini_salary_intelligence import generate_salary_insights

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# =========================
# ALLOWED FILE TYPES
# =========================
ALLOWED_CONTENT_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
ALLOWED_EXTENSIONS = [".pdf", ".docx"]


# =========================
# GET RESUME HISTORY
# =========================
@router.get("/history")
async def get_resume_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history = db.query(ResumeHistory).filter(ResumeHistory.user_id == current_user.id).order_by(ResumeHistory.upload_date.desc()).all()
    
    # Format response so the frontend gets what it needs
    return {
        "success": True,
        "history": [
            {
                "id": entry.id,
                "filename": entry.filename,
                "upload_date": entry.upload_date,
                "ats_score": entry.analysis_data.get("ats_score", 0),
                "career_domain": entry.analysis_data.get("career_domain", ""),
                "resume_text": entry.resume_text,
            }
            for entry in history
        ]
    }

# =========================
# UPLOAD RESUME
# =========================
@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # =========================
    # FILE TYPE VALIDATION
    # =========================
    file_extension = os.path.splitext(file.filename or "")[1].lower()

    if (
        file.content_type not in ALLOWED_CONTENT_TYPES
        and file_extension not in ALLOWED_EXTENSIONS
    ):
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{file.content_type}'. Only PDF and DOCX files are accepted."
        )

    # =========================
    # SAVE FILE
    # =========================
    file_path = (
        f"{UPLOAD_FOLDER}/{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # =========================
    # EXTRACT TEXT
    # =========================
    try:
        extracted_text = parse_resume(file_path)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse resume file: {str(e)}. Please ensure the file is not corrupted or password-protected."
        )

    if not extracted_text or extracted_text.strip() == "" or extracted_text == "Unsupported file format":
        raise HTTPException(
            status_code=422,
            detail="Could not extract text from the uploaded file. Please try a different file."
        )

    # =========================
    # CLEAN TEXT
    # =========================
    extracted_text = clean_text(
        extracted_text
    )

    # =========================
    # NLP EXTRACTIONS
    # =========================
    email = extract_email(extracted_text)
    phone = extract_phone(extracted_text)
    education = extract_education(extracted_text)
    experience = extract_experience(extracted_text)
    projects = extract_projects(extracted_text)
    certifications = extract_certifications(extracted_text)

    # =========================
    # SKILLS EXTRACTION
    # =========================
    skills_found = extract_skills(extracted_text)

    # =========================
    # AI ATS ANALYSIS
    # =========================
    ai_analysis = generate_ai_ats_analysis(extracted_text)

    ats_score = ai_analysis.get("ats_score", 75)
    career_domain = ai_analysis.get("career_domain", "Software Developer")
    summary = ai_analysis.get("summary", "")
    strengths = ai_analysis.get("strengths", [])
    weaknesses = ai_analysis.get("weaknesses", [])
    recommendations = ai_analysis.get("recommendations", [])

    # =========================
    # SAVE TO HISTORY
    # =========================
    analysis_data = {
        "email": email,
        "phone": phone,
        "education": education,
        "experience": experience,
        "projects": projects,
        "certifications": certifications,
        "skills_found": skills_found,
        "ats_score": ats_score,
        "career_domain": career_domain,
        "summary": summary,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations,
    }

    history_entry = ResumeHistory(
        user_id=current_user.id,
        filename=file.filename,
        resume_text=extracted_text,
        analysis_data=analysis_data
    )
    db.add(history_entry)
    db.commit()
    db.refresh(history_entry)

    # =========================
    # FINAL RESPONSE
    # =========================
    return {

        "success": True,

        "message": "Resume analyzed successfully 🚀",

        "filename": file.filename,
        "history_id": history_entry.id,

        # NLP DATA
        "email": email,
        "phone": phone,
        "education": education,
        "experience": experience,
        "projects": projects,
        "certifications": certifications,

        # SKILLS
        "skills_found": skills_found,

        # AI ATS DATA
        "ats_score": ats_score,
        "career_domain": career_domain,
        "summary": summary,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations,

        # RESUME TEXT
        "resume_text": extracted_text,
    }


# =========================
# AI JOB MATCHING
# =========================
@router.post("/ai-job-match")
async def ai_job_match(request: JobMatchRequest, current_user: User = Depends(get_current_user)):

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    if not request.job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description is required."
        )

    # AI ANALYSIS
    result = analyze_resume_with_jd(
        request.resume_text,
        request.job_description
    )

    return result


# =========================
# AI RESUME REVIEW
# =========================
@router.post("/resume-review")
async def resume_review(request: CareerAnalyticsRequest, current_user: User = Depends(get_current_user)):

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    # AI REVIEW
    result = generate_resume_review(request.resume_text)

    return result


# =========================
# AI CAREER MATCH
# =========================
@router.post("/career-match")
async def career_match(request: CareerMatchRequest, current_user: User = Depends(get_current_user)):

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    if not request.target_role.strip():
        raise HTTPException(
            status_code=400,
            detail="Target role is required."
        )

    if not request.experience_level.strip():
        raise HTTPException(
            status_code=400,
            detail="Experience level is required."
        )

    # AI CAREER ANALYSIS
    result = generate_career_match(
        request.resume_text,
        request.target_role,
        request.experience_level
    )

    return result


# =========================
# AI INTERVIEW PREPARATION
# =========================
@router.post("/interview-prep")
async def interview_prep(request: InterviewPrepRequest, current_user: User = Depends(get_current_user)):

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    if not request.target_role.strip():
        raise HTTPException(
            status_code=400,
            detail="Target role is required."
        )

    if not request.experience_level.strip():
        raise HTTPException(
            status_code=400,
            detail="Experience level is required."
        )

    # AI INTERVIEW PREP
    result = generate_interview_prep(
        request.resume_text,
        request.target_role,
        request.experience_level
    )

    return result


# =========================
# AI CAREER ANALYTICS
# =========================
@router.post("/career-analytics")
async def career_analytics(request: CareerAnalyticsRequest, current_user: User = Depends(get_current_user)):

    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    analytics = generate_career_analytics(request.resume_text)
    
    return analytics


# =========================
# AI RESUME REWRITE / SUGGESTIONS
# =========================
@router.post("/rewrite")
async def rewrite_resume(request: RewriteRequest, current_user: User = Depends(get_current_user)):
    
    if not request.resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )
        
    if not request.text_to_rewrite.strip():
        raise HTTPException(
            status_code=400,
            detail="Text to rewrite is required."
        )
        
    result = generate_rewrite(
        request.resume_text,
        request.section,
        request.text_to_rewrite
    )
    
    return result


# =========================
# AI SALARY INTELLIGENCE
# =========================
@router.post("/salary-insights")
async def salary_insights(request: SalaryIntelligenceRequest, current_user: User = Depends(get_current_user)):
    
    if not request.target_role.strip():
        raise HTTPException(
            status_code=400,
            detail="Target role is required."
        )
        
    if not request.experience_level.strip():
        raise HTTPException(
            status_code=400,
            detail="Experience level is required."
        )
        
    result = generate_salary_insights(
        request.target_role,
        request.experience_level,
        request.location
    )
    
    return result