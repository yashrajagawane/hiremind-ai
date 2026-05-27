import re


# =========================
# SKILLS DATABASE
# =========================
SKILLS = [

    "python",
    "java",
    "c++",
    "javascript",
    "react",
    "next.js",
    "node.js",
    "fastapi",
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "sql",
    "mongodb",
    "docker",
    "aws",
    "git",
    "github",
    "tailwind",
    "html",
    "css",
    "flask",
    "opencv",
    "tensorflow",
    "pytorch",
]


# =========================
# ATS ANALYZER
# =========================
def analyze_resume(resume_text: str):

    text = resume_text.lower()

    found_skills = []

    missing_skills = []



    # =========================
    # SKILL MATCHING
    # =========================
    for skill in SKILLS:

        if skill in text:
            found_skills.append(skill)

        else:
            missing_skills.append(skill)



    # =========================
    # SCORE CALCULATION
    # =========================
    total_skills = len(SKILLS)

    matched_skills = len(found_skills)

    ats_score = int(
        (matched_skills / total_skills) * 100
    )



    # =========================
    # BONUS CHECKS
    # =========================
    bonus = 0

    if "project" in text:
        bonus += 5

    if "experience" in text:
        bonus += 5

    if "education" in text:
        bonus += 5

    ats_score += bonus

    if ats_score > 100:
        ats_score = 100



    # =========================
    # SUGGESTIONS
    # =========================
    suggestions = []

    if ats_score < 60:
        suggestions.append(
            "Add more technical skills"
        )

    if "docker" not in text:
        suggestions.append(
            "Consider adding Docker skills"
        )

    if "aws" not in text:
        suggestions.append(
            "Cloud technologies like AWS can improve ATS score"
        )

    if "machine learning" not in text:
        suggestions.append(
            "Add ML-related projects or skills"
        )



    # =========================
    # RETURN RESULT
    # =========================
    return {

        "ats_score": ats_score,

        "skills_found": found_skills,

        "missing_skills": missing_skills[:5],

        "suggestions": suggestions,
    }