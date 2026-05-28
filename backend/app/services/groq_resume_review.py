import os
import json
import traceback

from groq import Groq
from dotenv import load_dotenv

# =========================
# LOAD ENV
# =========================
load_dotenv()

# =========================
# GROQ CLIENT
# =========================
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================
# AI RESUME REVIEW
# =========================
def generate_resume_review(
    resume_text: str
):

    try:

        # =========================
        # PROMPT
        # =========================
        prompt = f"""
You are an expert AI recruiter, ATS evaluator, and hiring consultant.

Analyze the following resume professionally.

Your response MUST be professional, detailed, and ATS-focused.

Return ONLY valid JSON.

Resume:
{resume_text}

JSON format:

{{
    "summary": "Write a professional summary about the candidate profile and ATS quality.",

    "strengths": [
        "Strength 1",
        "Strength 2",
        "Strength 3"
    ],

    "weaknesses": [
        "Weakness 1",
        "Weakness 2",
        "Weakness 3"
    ],

    "recommendations": [
        "Recommendation 1",
        "Recommendation 2",
        "Recommendation 3"
    ],

    "career_fit": [
        "Role 1",
        "Role 2",
        "Role 3"
    ]
}}
"""

        # =========================
        # GROQ API CALL
        # =========================
        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.3,

            max_tokens=1200
        )

        # =========================
        # RAW RESPONSE
        # =========================
        raw_output = (
            response
            .choices[0]
            .message
            .content
        )

        print("\n====================")
        print("RAW AI RESPONSE:")
        print(raw_output)
        print("====================\n")

        # =========================
        # CLEAN RESPONSE
        # =========================
        raw_output = raw_output.replace(
            "```json",
            ""
        )

        raw_output = raw_output.replace(
            "```",
            ""
        ).strip()

        # =========================
        # PARSE JSON
        # =========================
        result = json.loads(
            raw_output
        )

        # =========================
        # SAFETY FALLBACKS
        # =========================
        result.setdefault(
            "summary",
            "No summary generated."
        )

        result.setdefault(
            "strengths",
            []
        )

        result.setdefault(
            "weaknesses",
            []
        )

        result.setdefault(
            "recommendations",
            []
        )

        result.setdefault(
            "career_fit",
            []
        )

        return result

    except Exception as e:

        print("\n====================")
        print("RESUME REVIEW ERROR")
        print("====================")

        traceback.print_exc()

        return {

            "summary":
            "Unable to generate AI review at the moment.",

            "strengths": [
                "Resume parsing completed successfully."
            ],

            "weaknesses": [
                "AI review generation failed."
            ],

            "recommendations": [
                "Please try again in a few seconds."
            ],

            "career_fit": [
                "Software Developer"
            ]
        }