from fastapi import APIRouter, UploadFile, File, HTTPException

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
# TEMP RESUME STORAGE
# NOTE: This global state is a known architectural issue (Bug #1).
# It will be replaced in Phase 2 with per-request data flow.
# For now, it is clearly documented.
# =========================
LAST_RESUME_TEXT = ""
LAST_CAREER_ANALYTICS = {}

# =========================
# ALLOWED FILE TYPES
# Fix: Added file type validation (Bug #17)
# =========================
ALLOWED_CONTENT_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
ALLOWED_EXTENSIONS = [".pdf", ".docx"]


# =========================
# UPLOAD RESUME
# =========================
@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    global LAST_RESUME_TEXT
    global LAST_CAREER_ANALYTICS

    # =========================
    # FILE TYPE VALIDATION
    # Fix: Reject non-PDF/DOCX files (Bug #17)
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
    # Fix: Wrapped in try/except to handle corrupted/password-protected files (Bug #18)
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
    # STORE RESUME TEXT
    # =========================
    LAST_RESUME_TEXT = extracted_text

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
    # CAREER ANALYTICS
    # =========================
    LAST_CAREER_ANALYTICS = (
        generate_career_analytics(extracted_text)
    )

    # =========================
    # FINAL RESPONSE
    # =========================
    return {

        "success": True,

        "message": "Resume analyzed successfully 🚀",

        "filename": file.filename,

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

        # RESUME PREVIEW (Fix: use 2000 chars for a cleaner cut)
        "resume_text": extracted_text[:2000],
    }


# =========================
# AI JOB MATCHING
# Fix: Returns proper HTTP 400 errors instead of HTTP 200 with error key (Bug #8)
# =========================
@router.post("/ai-job-match")
async def ai_job_match(data: dict):

    global LAST_RESUME_TEXT

    job_description = data.get("job_description", "")

    # VALIDATION
    if not LAST_RESUME_TEXT:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first before running job match."
        )

    if not job_description:
        raise HTTPException(
            status_code=400,
            detail="job_description is required."
        )

    # AI ANALYSIS
    result = analyze_resume_with_jd(
        LAST_RESUME_TEXT,
        job_description
    )

    return result


# =========================
# AI RESUME REVIEW
# Fix: Returns proper HTTP 400 errors instead of HTTP 200 with error key (Bug #8)
# =========================
@router.post("/resume-review")
async def resume_review():

    global LAST_RESUME_TEXT

    # VALIDATION
    if not LAST_RESUME_TEXT:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first before running resume review."
        )

    # AI REVIEW
    result = generate_resume_review(LAST_RESUME_TEXT)

    return result


# =========================
# AI CAREER MATCH
# Fix: Returns proper HTTP 400 errors instead of HTTP 200 with error key (Bug #8)
# =========================
@router.post("/career-match")
async def career_match(data: dict):

    global LAST_RESUME_TEXT

    # VALIDATION
    if not LAST_RESUME_TEXT:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first before running career match."
        )

    target_role = data.get("target_role", "")
    experience_level = data.get("experience_level", "")

    if not target_role:
        raise HTTPException(
            status_code=400,
            detail="target_role is required."
        )

    if not experience_level:
        raise HTTPException(
            status_code=400,
            detail="experience_level is required."
        )

    # AI CAREER ANALYSIS
    result = generate_career_match(
        LAST_RESUME_TEXT,
        target_role,
        experience_level
    )

    return result


# =========================
# AI INTERVIEW PREPARATION
# Fix: Returns proper HTTP 400 errors instead of HTTP 200 with error key (Bug #8)
# =========================
@router.post("/interview-prep")
async def interview_prep(data: dict):

    global LAST_RESUME_TEXT

    # VALIDATION
    if not LAST_RESUME_TEXT:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first before running interview prep."
        )

    target_role = data.get("target_role", "")
    experience_level = data.get("experience_level", "")

    if not target_role:
        raise HTTPException(
            status_code=400,
            detail="target_role is required."
        )

    if not experience_level:
        raise HTTPException(
            status_code=400,
            detail="experience_level is required."
        )

    # AI INTERVIEW PREP
    result = generate_interview_prep(
        LAST_RESUME_TEXT,
        target_role,
        experience_level
    )

    return result


# =========================
# AI CAREER ANALYTICS
# Fix: Returns proper HTTP 400 error instead of HTTP 200 with error key (Bug #8)
# =========================
@router.get("/career-analytics")
async def career_analytics():

    global LAST_CAREER_ANALYTICS

    if not LAST_CAREER_ANALYTICS:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first to generate career analytics."
        )

    return LAST_CAREER_ANALYTICS