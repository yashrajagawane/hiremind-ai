import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def generate_salary_insights(target_role: str, experience_level: str, location: str) -> dict:
    try:
        prompt = f"""
You are an expert tech recruiter and compensation analyst.
Provide detailed salary intelligence and market insights for the following profile:

Role: {target_role}
Experience Level: {experience_level}
Location/Market: {location}

Return ONLY a valid JSON object (no markdown, no explanations outside JSON) with the following structure:
{{
    "estimated_salary_range": {{
        "low": "String value (e.g., $90,000)",
        "median": "String value (e.g., $120,000)",
        "high": "String value (e.g., $150,000)"
    }},
    "market_demand": "String (e.g., High, Medium, Low) with a brief 1-sentence explanation.",
    "top_hiring_industries": [
        "Industry 1",
        "Industry 2",
        "Industry 3"
    ],
    "negotiation_tips": [
        "Tip 1",
        "Tip 2"
    ],
    "key_skills_for_premium_pay": [
        "Skill 1",
        "Skill 2"
    ]
}}
"""
        response = model.generate_content(prompt)
        raw_output = response.text.replace("```json", "").replace("```", "").strip()
        result = json.loads(raw_output)
        return result
    except Exception as e:
        print("\n====================")
        print("GEMINI SALARY INTELLIGENCE ERROR")
        print("====================")
        print(str(e))
        return {
            "estimated_salary_range": {
                "low": "N/A",
                "median": "N/A",
                "high": "N/A"
            },
            "market_demand": "Data unavailable at this time.",
            "top_hiring_industries": [],
            "negotiation_tips": [],
            "key_skills_for_premium_pay": []
        }
