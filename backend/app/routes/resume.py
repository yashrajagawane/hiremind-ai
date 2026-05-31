from fastapi import APIRouter, UploadFile, File

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
# =========================
LAST_RESUME_TEXT = ""
LAST_CAREER_ANALYTICS = {}

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
    extracted_text = parse_resume(
        file_path
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
    email = extract_email(
        extracted_text
    )

    phone = extract_phone(
        extracted_text
    )

    education = extract_education(
        extracted_text
    )

    experience = extract_experience(
        extracted_text
    )

    projects = extract_projects(
        extracted_text
    )

    certifications = extract_certifications(
        extracted_text
    )

    # =========================
    # SKILLS EXTRACTION
    # =========================
    skills_found = extract_skills(
        extracted_text
    )

    # =========================
    # AI ATS ANALYSIS
    # =========================
    ai_analysis = generate_ai_ats_analysis(
        extracted_text
    )

    ats_score = ai_analysis.get(
        "ats_score",
        75
    )

    career_domain = ai_analysis.get(
        "career_domain",
        "Software Developer"
    )

    summary = ai_analysis.get(
        "summary",
        ""
    )

    strengths = ai_analysis.get(
        "strengths",
        []
    )

    weaknesses = ai_analysis.get(
        "weaknesses",
        []
    )

    recommendations = ai_analysis.get(
        "recommendations",
        []
    )

    # =========================
    # CAREER ANALYTICS
    # =========================

    LAST_CAREER_ANALYTICS = (
        generate_career_analytics(
            extracted_text
        )
    )

    # =========================
    # FINAL RESPONSE
    # =========================
    return {

        "success": True,

        "message":
        "Resume analyzed successfully 🚀",

        "filename":
        file.filename,

        # =========================
        # NLP DATA
        # =========================
        "email":
        email,

        "phone":
        phone,

        "education":
        education,

        "experience":
        experience,

        "projects":
        projects,

        "certifications":
        certifications,

        # =========================
        # SKILLS
        # =========================
        "skills_found":
        skills_found,

        # =========================
        # AI ATS DATA
        # =========================
        "ats_score":
        ats_score,

        "career_domain":
        career_domain,

        "summary":
        summary,

        "strengths":
        strengths,

        "weaknesses":
        weaknesses,

        "recommendations":
        recommendations,

        # =========================
        # RESUME PREVIEW
        # =========================
        "resume_text":
        extracted_text[:1500],
    }


# =========================
# AI JOB MATCHING
# =========================
@router.post("/ai-job-match")
async def ai_job_match(data: dict):

    global LAST_RESUME_TEXT

    job_description = data.get(
        "job_description",
        ""
    )

    # =========================
    # VALIDATION
    # =========================
    if not LAST_RESUME_TEXT:

        return {
            "error":
            "Please upload resume first"
        }

    if not job_description:

        return {
            "error":
            "job_description is required"
        }

    # =========================
    # AI ANALYSIS
    # =========================
    result = analyze_resume_with_jd(

        LAST_RESUME_TEXT,
        job_description
    )

    return result


# =========================
# AI RESUME REVIEW
# =========================
@router.post("/resume-review")
async def resume_review():

    global LAST_RESUME_TEXT

    # =========================
    # VALIDATION
    # =========================
    if not LAST_RESUME_TEXT:

        return {
            "error":
            "Please upload resume first"
        }

    # =========================
    # AI REVIEW
    # =========================
    result = generate_resume_review(
        LAST_RESUME_TEXT
    )

    return result


# =========================
# AI CAREER MATCH
# =========================
@router.post("/career-match")
async def career_match(data: dict):

    global LAST_RESUME_TEXT

    # =========================
    # VALIDATION
    # =========================
    if not LAST_RESUME_TEXT:

        return {
            "error":
            "Please upload resume first"
        }

    target_role = data.get(
        "target_role",
        ""
    )

    experience_level = data.get(
        "experience_level",
        ""
    )

    if not target_role:

        return {
            "error":
            "target_role is required"
        }

    if not experience_level:

        return {
            "error":
            "experience_level is required"
        }

    # =========================
    # AI CAREER ANALYSIS
    # =========================
    result = generate_career_match(

        LAST_RESUME_TEXT,
        target_role,
        experience_level
    )

    return result

# =========================
# AI INTERVIEW PREPARATION
# =========================
@router.post("/interview-prep")
async def interview_prep(data: dict):

    global LAST_RESUME_TEXT

    # =========================
    # VALIDATION
    # =========================
    if not LAST_RESUME_TEXT:

        return {
            "error":
            "Please upload resume first"
        }

    target_role = data.get(
        "target_role",
        ""
    )

    experience_level = data.get(
        "experience_level",
        ""
    )

    if not target_role:

        return {
            "error":
            "target_role is required"
        }

    if not experience_level:

        return {
            "error":
            "experience_level is required"
        }

    # =========================
    # AI INTERVIEW PREP
    # =========================
    result = generate_interview_prep(

        LAST_RESUME_TEXT,
        target_role,
        experience_level
    )

    return result

# =========================
# AI CAREER ANALYTICS
# =========================
@router.get("/career-analytics")
async def career_analytics():

    global LAST_CAREER_ANALYTICS

    if not LAST_CAREER_ANALYTICS:

        return {
            "error":
            "Please upload resume first"
        }

    return LAST_CAREER_ANALYTICS