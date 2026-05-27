import os
import json

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
# AI ATS ANALYSIS
# =========================
def generate_ai_ats_analysis(resume_text):

    prompt = f"""
    You are an advanced AI ATS (Applicant Tracking System).

    Analyze the following resume carefully.

    Evaluate:
    - Technical Skills
    - Projects
    - Certifications
    - Experience
    - Resume Quality
    - Industry Readiness

    Return ONLY valid JSON format.

    JSON Format:
    {{
        "ats_score": number,
        "strengths": [],
        "weaknesses": [],
        "recommendations": [],
        "career_domain": "",
        "summary": ""
    }}

    Resume:
    {resume_text}
    """

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3,
    )

    content = response.choices[0].message.content

    # =========================
    # CLEAN RESPONSE
    # =========================
    content = content.replace(
        "```json",
        ""
    )

    content = content.replace(
        "```",
        ""
    )

    # =========================
    # PARSE JSON
    # =========================
    try:

        parsed = json.loads(content)

        return parsed

    except Exception as e:

        print("GROQ JSON ERROR:", e)

        return {

            "ats_score": 75,

            "strengths": [
                "Good technical background"
            ],

            "weaknesses": [
                "Could not fully analyze resume"
            ],

            "recommendations": [
                "Improve resume formatting"
            ],

            "career_domain":
            "Software Developer",

            "summary":
            "AI analysis temporarily unavailable."
        }