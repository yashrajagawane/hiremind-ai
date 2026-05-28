import os
import json

import google.generativeai as genai

from dotenv import load_dotenv

# =========================
# LOAD ENV
# =========================
load_dotenv()

# =========================
# CONFIGURE GEMINI
# =========================
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# =========================
# GEMINI MODEL
# =========================
model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# =========================
# GENERATE RESUME REVIEW
# =========================
def generate_resume_review(
    resume_text: str
):

    try:

        # =========================
        # PROMPT
        # =========================
        prompt = f"""
You are an expert AI recruiter.

Analyze this resume professionally.

IMPORTANT:
- Keep response concise
- Keep every point under 20 words
- Return ONLY valid JSON
- No explanations
- No markdown
- No long paragraphs

Resume:
{resume_text}

Return JSON format:

{{
    "summary": "2 line professional summary",

    "strengths": [
        "Short strength",
        "Short strength",
        "Short strength"
    ],

    "weaknesses": [
        "Short weakness",
        "Short weakness",
        "Short weakness"
    ],

    "recommendations": [
        "Short recommendation",
        "Short recommendation",
        "Short recommendation"
    ],

    "career_fit": [
        "Role 1",
        "Role 2",
        "Role 3"
    ]
}}
"""

        # =========================
        # GEMINI RESPONSE
        # =========================
        response = model.generate_content(
            prompt
        )

        # =========================
        # RAW OUTPUT
        # =========================
        raw_output = (
            response.text
        )

        # =========================
        # CLEAN JSON
        # =========================
        raw_output = raw_output.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

        # =========================
        # PARSE JSON
        # =========================
        result = json.loads(
            raw_output
        )

        return result

    except Exception as e:

        print("\n====================")
        print("GEMINI REVIEW ERROR")
        print("====================")
        print(str(e))

        return {

            "summary":
            "Unable to generate resume review.",

            "strengths": [],

            "weaknesses": [],

            "recommendations": [],

            "career_fit": []
        }