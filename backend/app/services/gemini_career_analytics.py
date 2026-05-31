import os
import json

import google.generativeai as genai

# =========================
# CONFIGURE GEMINI
# =========================

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


# =========================
# CAREER ANALYTICS
# =========================

def generate_career_analytics(
    resume_text
):

    try:

        prompt = f"""
You are an expert AI career coach.

Analyze the resume carefully.

Resume:
{resume_text}

IMPORTANT RULES:

- Return ONLY valid JSON
- No markdown
- No explanations
- Readiness score must be between 0 and 100
- Keep every item SHORT
- Maximum 4 words per item
- No full sentences
- Use concise skill names
- Use concise roadmap steps
- Use concise role names
- Return exactly 5 strengths
- Return exactly 5 skill gaps
- Return exactly 5 roadmap steps
- Return exactly 5 career path steps
- Salary range should be realistic for India
- Career path must match the resume profile
- Roadmap should be practical

GOOD EXAMPLES:

Strengths:
Python
Machine Learning
Next.js
Computer Vision
Problem Solving

Skill Gaps:
AWS
Docker
CI/CD
TensorFlow
System Design

Roadmap:
Learn AWS
Master Docker
Build CI/CD
Learn TensorFlow
Get Internship

Career Path:
ML Engineer
AI Engineer
Senior ML Engineer
Lead AI Engineer
AI Architect

Return JSON:

{{
    "career_readiness_score": 85,

    "level": "Intermediate",

    "salary_range": "₹6-10 LPA",

    "current_strengths": [
        "Python",
        "Machine Learning",
        "Next.js",
        "Computer Vision",
        "Problem Solving"
    ],

    "skill_gaps": [
        "AWS",
        "Docker",
        "CI/CD",
        "TensorFlow",
        "System Design"
    ],

    "learning_roadmap": [
        "Learn AWS",
        "Master Docker",
        "Build CI/CD",
        "Learn TensorFlow",
        "Get Internship"
    ],

    "career_path": [
        "ML Engineer",
        "AI Engineer",
        "Senior ML Engineer",
        "Lead AI Engineer",
        "AI Architect"
    ]
}}
"""

        response = model.generate_content(
            prompt
        )

        content = response.text.strip()

        content = (
            content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        result = json.loads(content)

        return result

    except Exception as e:

        print(
            "\n===================="
        )
        print(
            "CAREER ANALYTICS ERROR"
        )
        print(
            "===================="
        )
        print(str(e))

        return {

            "career_readiness_score": 0,

            "level":
            "Unknown",

            "salary_range":
            "N/A",

            "current_strengths": [],

            "skill_gaps": [],

            "learning_roadmap": [],

            "career_path": []
        }