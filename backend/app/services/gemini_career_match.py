import os
import json

import google.generativeai as genai

from dotenv import load_dotenv
from app.utils.cache import cached_response

# =========================
# LOAD ENV
# Fix: load_dotenv() was missing — GEMINI_API_KEY was None in production
# =========================
load_dotenv()

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
# CAREER MATCH ANALYSIS
# =========================

def generate_career_match(
    resume_text,
    target_role,
    experience_level
):

    try:

        prompt = f"""
You are an expert AI recruiter and hiring manager.

Analyze the resume carefully.

Evaluate:

1. Technical skills match
2. Projects relevance
3. Education relevance
4. Experience level suitability

Calculate match score realistically.

Scoring Rules:

90-100 = Excellent Match
75-89 = Strong Match
60-74 = Moderate Match
40-59 = Weak Match
0-39 = Poor Match

Do NOT give default scores.

The score must depend on the actual resume content and selected role.

Hiring Probability Rules:

90+ = High
70-89 = Medium
Below 70 = Low

IMPORTANT RULES:

- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT add explanations
- Match score must be between 0 and 100
- Hiring probability must be ONLY:
  High, Medium, or Low
- Return maximum 5 matched skills
- Return maximum 5 missing skills
- Return maximum 4 alternative roles
- Keep the response concise and recruiter-friendly

Resume:
{resume_text}

Target Role:
{target_role}

Experience Level:
{experience_level}

Return this exact JSON structure:

{{
    "match_score": number,

    "hiring_probability": "High/Medium/Low",

    "matched_skills": [
        "Skill 1",
        "Skill 2",
        "Skill 3",
        "Skill 4",
        "Skill 5"
    ],

    "missing_skills": [
        "Skill 1",
        "Skill 2",
        "Skill 3",
        "Skill 4",
        "Skill 5"
    ],

    "alternative_roles": [
        "Role 1",
        "Role 2",
        "Role 3",
        "Role 4"
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
            "CAREER MATCH ERROR"
        )
        print(
            "===================="
        )
        print(str(e))

        return {

            "match_score": 0,

            "hiring_probability":
            "Unknown",

            "matched_skills": [],

            "missing_skills": [],

            "alternative_roles": []
        }