import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def generate_rewrite(resume_text: str, section: str, text_to_rewrite: str) -> dict:
    try:
        prompt = f"""
You are an expert AI resume coach and technical recruiter.
A candidate wants to improve a specific bullet point or sentence from their resume.
Rewrite the text to make it more impactful, action-oriented, and quantified.

Full Resume Context:
{resume_text}

Section being edited: {section}
Original text to rewrite:
{text_to_rewrite}

Provide 3 distinct rewritten options (e.g., one action-oriented, one metric-focused, one concise).

Return ONLY valid JSON format with no markdown, like this:
{{
    "original": "...",
    "suggestions": [
        "First suggested rewrite here...",
        "Second suggested rewrite here...",
        "Third suggested rewrite here..."
    ],
    "explanation": "Brief explanation of why these changes improve the resume."
}}
"""
        response = model.generate_content(prompt)
        raw_output = response.text.replace("```json", "").replace("```", "").strip()
        result = json.loads(raw_output)
        return result
    except Exception as e:
        print("\n====================")
        print("GEMINI REWRITE ERROR")
        print("====================")
        print(str(e))
        return {
            "original": text_to_rewrite,
            "suggestions": [text_to_rewrite],
            "explanation": "Unable to generate rewrite suggestions at this time."
        }
