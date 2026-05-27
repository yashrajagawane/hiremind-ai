import re
import spacy

# =========================
# LOAD NLP MODEL
# =========================
nlp = spacy.load("en_core_web_sm")


# =========================
# CLEAN RESUME TEXT
# =========================
def clean_text(text):

    # remove extra spaces
    text = re.sub(r"\s+", " ", text)

    # remove weird symbols
    text = re.sub(r"[•|▪|■|●]", " ", text)

    # normalize dashes
    text = text.replace("—", "-")

    return text.strip()


# =========================
# EXTRACT EMAIL
# =========================
def extract_email(text):

    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

    matches = re.findall(pattern, text)

    return matches[0] if matches else None


# =========================
# EXTRACT PHONE
# =========================
def extract_phone(text):

    pattern = r"\+?\d[\d -]{8,}\d"

    matches = re.findall(pattern, text)

    return matches[0] if matches else None


# =========================
# EXTRACT EDUCATION
# =========================
def extract_education(text):

    education_keywords = [

        "b.tech",
        "b.e",
        "m.tech",
        "bachelor",
        "master",
        "computer science",
        "information technology",
        "engineering",
        "mba",
    ]

    found = []

    lower_text = text.lower()

    for keyword in education_keywords:

        if keyword in lower_text:
            found.append(keyword)

    return list(set(found))


# =========================
# EXTRACT EXPERIENCE
# =========================
def extract_experience(text):

    experience_keywords = [

        "intern",
        "internship",
        "freelance",
        "developer",
        "engineer",
        "experience",
        "worked",
    ]

    sentences = text.split(".")

    experience = []

    for sentence in sentences:

        lower_sentence = sentence.lower()

        for keyword in experience_keywords:

            if keyword in lower_sentence:

                if len(sentence.strip()) > 20:

                    experience.append(
                        sentence.strip()
                    )

    return experience[:5]


# =========================
# EXTRACT PROJECTS
# =========================
def extract_projects(text):

    project_keywords = [

        "project",
        "developed",
        "built",
        "created",
        "implemented",
    ]

    sentences = text.split(".")

    projects = []

    for sentence in sentences:

        lower_sentence = sentence.lower()

        for keyword in project_keywords:

            if keyword in lower_sentence:

                cleaned = sentence.strip()

                if len(cleaned) > 20:

                    projects.append(cleaned)

    return list(set(projects[:5]))


# =========================
# EXTRACT CERTIFICATIONS
# =========================
def extract_certifications(text):

    cert_keywords = [

        "certification",
        "certified",
        "bootcamp",
        "course",
        "training",
    ]

    lines = text.split(".")

    certifications = []

    for line in lines:

        lower_line = line.lower()

        for keyword in cert_keywords:

            if keyword in lower_line:

                cleaned = line.strip()

                if len(cleaned) > 10:

                    certifications.append(cleaned)

    return list(set(certifications[:5]))