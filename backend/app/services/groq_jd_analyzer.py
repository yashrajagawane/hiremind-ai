import os
import json
import re

from groq import Groq

# =========================
# GROQ CLIENT
# =========================
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# =========================
# CLEAN JSON RESPONSE
# =========================
def clean_json_response(text):

    # remove ```json
    text = re.sub(
        r"```json",
        "",
        text
    )

    # remove ```
    text = re.sub(
        r"```",
        "",
        text
    )

    return text.strip()


# =========================
# AI JOB MATCH ANALYSIS
# =========================
def analyze_resume_with_jd(
    resume_text,
    job_description
):

    prompt = f"""
You are an advanced ATS AI system.

Analyze the resume against the job description.

IMPORTANT:
Return ONLY VALID JSON.
Do NOT add explanations.
Do NOT use markdown.

Required JSON format:

{{
    "ats_score": number,
    "candidate_level": "Fresher/Mid-Level/Senior",
    "matched_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": [],
    "recommendation": "Excellent Match/Strong Match/Moderate Match/Needs Improvement",
    "summary": "short professional summary"
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.2,
    )

    content = (
        response.choices[0]
        .message
        .content
    )

    # =========================
    # CLEAN RESPONSE
    # =========================
    content = clean_json_response(
        content
    )

    try:

        return json.loads(content)

    except Exception as e:

        print("AI JSON ERROR:", e)

        return {

            "ats_score": 0,

            "candidate_level":
            "Unknown",

            "matched_skills": [],

            "missing_skills": [],

            "strengths": [],

            "weaknesses": [],

            "recommendation":
            "AI Parsing Failed",

            "summary":
            content,
        }