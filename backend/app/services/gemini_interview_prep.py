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
# INTERVIEW PREPARATION
# =========================

def generate_interview_prep(
    resume_text,
    target_role,
    experience_level
):

    try:

        prompt = f"""
You are a senior technical interviewer.

Create SHORT interview preparation questions.

Target Role:
{target_role}

Experience Level:
{experience_level}

Resume:
{resume_text}

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.
4. No long questions.
5. Maximum 15 words per question.
6. Do NOT include project descriptions inside questions.
7. Do NOT include percentages, statistics, or achievements in questions.
8. Questions must sound like real interview questions.
9. Keep questions simple and direct.

Generate EXACTLY:

- 4 Technical Questions
- 4 Resume Questions
- 3 HR Questions
- 3 Focus Areas

GOOD EXAMPLES:

Technical:
- What is overfitting?
- Explain feature engineering.
- What is cross validation?
- How do you evaluate models?

Resume:
- Explain your sentiment analysis project.
- Why did you use Python?
- Biggest project challenge?
- How did you improve accuracy?

HR:
- Tell me about yourself.
- Why should we hire you?
- What are your strengths?

Focus Areas:
- Deep Learning
- Cloud Platforms
- MLOps

JSON FORMAT:

{{
    "technical_questions": [
        "Question"
    ],

    "resume_questions": [
        "Question"
    ],

    "hr_questions": [
        "Question"
    ],

    "focus_areas": [
        "Area"
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

        data = json.loads(content)

        # =========================
        # LIMIT OUTPUT SIZE
        # =========================

        data["technical_questions"] = (
            data.get(
                "technical_questions",
                []
            )[:4]
        )

        data["resume_questions"] = (
            data.get(
                "resume_questions",
                []
            )[:4]
        )

        data["hr_questions"] = (
            data.get(
                "hr_questions",
                []
            )[:3]
        )

        data["focus_areas"] = (
            data.get(
                "focus_areas",
                []
            )[:3]
        )

        return data

    except Exception as e:

        print(
            "\n===================="
        )
        print(
            "INTERVIEW PREP ERROR"
        )
        print(
            "===================="
        )
        print(str(e))

        return {

            "technical_questions": [],

            "resume_questions": [],

            "hr_questions": [],

            "focus_areas": []
        }