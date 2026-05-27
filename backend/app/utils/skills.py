# =========================
# MASTER SKILLS DATABASE
# =========================

SKILLS_DB = [

    # Programming
    "python",
    "java",
    "c",
    "c++",
    "javascript",
    "typescript",

    # Frontend
    "react",
    "next.js",
    "html",
    "css",
    "tailwind",
    "bootstrap",

    # Backend
    "node.js",
    "express",
    "fastapi",
    "django",
    "flask",

    # Database
    "mysql",
    "postgresql",
    "mongodb",
    "sqlite",

    # AI / ML
    "machine learning",
    "deep learning",
    "nlp",
    "computer vision",
    "tensorflow",
    "pytorch",
    "opencv",
    "scikit-learn",

    # Cloud / DevOps
    "aws",
    "docker",
    "kubernetes",
    "vercel",
    "render",

    # Tools
    "git",
    "github",
    "postman",

    # Data Science
    "pandas",
    "numpy",
    "matplotlib",
    "xgboost",
]


# =========================
# EXTRACT SKILLS
# =========================

def extract_skills(resume_text: str):

    resume_text = resume_text.lower()

    found_skills = []

    for skill in SKILLS_DB:

        if skill.lower() in resume_text:
            found_skills.append(skill)

    return list(set(found_skills))