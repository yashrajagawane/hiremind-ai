from PyPDF2 import PdfReader
from docx import Document


# =========================
# EXTRACT PDF TEXT
# =========================
def extract_pdf_text(file_path: str):

    text = ""

    pdf_reader = PdfReader(file_path)

    for page in pdf_reader.pages:
        extracted = page.extract_text()

        if extracted:
            text += extracted + "\n"

    return text


# =========================
# EXTRACT DOCX TEXT
# =========================
def extract_docx_text(file_path: str):

    doc = Document(file_path)

    text = ""

    for para in doc.paragraphs:
        text += para.text + "\n"

    return text


# =========================
# MAIN RESUME PARSER
# =========================
def parse_resume(file_path: str):

    if file_path.endswith(".pdf"):
        return extract_pdf_text(file_path)

    elif file_path.endswith(".docx"):
        return extract_docx_text(file_path)

    else:
        return "Unsupported file format"