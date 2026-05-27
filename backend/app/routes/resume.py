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


# =========================
# UPLOAD RESUME
# =========================
@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    global LAST_RESUME_TEXT

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