import re


# =========================
# DETECT CAREER DOMAIN
# Fix: Full Stack check now comes FIRST before individual React/Node checks (Bug #15)
# Previously, "react" was checked for Frontend before Full Stack, making Full Stack unreachable.
# =========================
def detect_domain(skills):

    skills_text = " ".join(skills).lower()

    # Check Full Stack FIRST (requires both react AND node.js)
    if all(skill in skills_text for skill in ["react", "node.js"]):
        return "Full Stack Developer"

    elif any(skill in skills_text for skill in [
        "machine learning",
        "deep learning",
        "nlp",
        "computer vision",
        "tensorflow",
        "pytorch",
    ]):
        return "AI / Machine Learning Engineer"

    elif any(skill in skills_text for skill in [
        "react",
        "next.js",
        "javascript",
        "frontend",
    ]):
        return "Frontend Developer"

    elif any(skill in skills_text for skill in [
        "node.js",
        "express",
        "mongodb",
        "backend",
    ]):
        return "Backend Developer"

    return "Software Developer"


# =========================
# GENERATE AI INSIGHTS
# NOTE: This function is currently not called from any route (Bug #10 — dead code).
# It is preserved here for potential future use in Phase 2 when per-user analytics
# may need rule-based fallback insights.
# =========================
def generate_ai_insights(data):

    skills = data.get("skills_found", [])
    missing = data.get("missing_skills", [])
    projects = data.get("projects", [])
    ats_score = data.get("ats_score", 0)

    strengths = []
    weaknesses = []
    recommendations = []

    # =========================
    # STRENGTHS
    # =========================
    if len(skills) >= 10:
        strengths.append(
            "Strong technical skillset detected"
        )

    if len(projects) >= 2:
        strengths.append(
            "Good hands-on project experience"
        )

    if ats_score >= 80:
        strengths.append(
            "Excellent ATS compatibility"
        )

    # =========================
    # WEAKNESSES
    # =========================
    if "docker" in missing:
        weaknesses.append(
            "No Docker/containerization skills found"
        )

    if "aws" in missing:
        weaknesses.append(
            "Cloud deployment experience missing"
        )

    if len(projects) < 2:
        weaknesses.append(
            "Project count is low"
        )

    recommendations.append(
        "Add measurable project achievements"
    )

    if "docker" in missing:
        recommendations.append(
            "Learn Docker for deployment workflows"
        )

    if "aws" in missing:
        recommendations.append(
            "Add AWS or cloud-based projects"
        )

    if "mongodb" in missing:
        recommendations.append(
            "Learn MongoDB for full-stack development"
        )

    # =========================
    # DOMAIN DETECTION
    # =========================
    domain = detect_domain(skills)

    # ===========================
    # AI SUMMARY
    # ===========================
    summary = (
        f"Candidate is suited for {domain} roles "
        f"with an ATS score of {ats_score}%."
    )

    return {

        "career_domain": domain,

        "summary": summary,

        "strengths": strengths,

        "weaknesses": weaknesses,

        "recommendations": recommendations,
    }
