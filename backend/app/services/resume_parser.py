from PyPDF2 import PdfReader
from docx import Document


# =========================
# EXTRACT PDF TEXT
# Fix: Added error handling for corrupted/encrypted PDFs (Bug #18)
# =========================
def extract_pdf_text(file_path: str) -> str:

    try:
        text = ""
        pdf_reader = PdfReader(file_path)

        # Check for encryption
        if pdf_reader.is_encrypted:
            raise ValueError("The PDF file is password-protected. Please upload an unprotected PDF.")

        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"

        return text

    except ValueError:
        raise  # Re-raise our custom messages

    except Exception as e:
        raise RuntimeError(f"Failed to read PDF file: {str(e)}")


# =========================
# EXTRACT DOCX TEXT
# Fix: Added error handling for corrupted DOCX files (Bug #18)
# =========================
def extract_docx_text(file_path: str) -> str:

    try:
        doc = Document(file_path)
        text = ""

        for para in doc.paragraphs:
            text += para.text + "\n"

        return text

    except Exception as e:
        raise RuntimeError(f"Failed to read DOCX file: {str(e)}")


# =========================
# MAIN RESUME PARSER
# =========================
def parse_resume(file_path: str) -> str:

    if file_path.lower().endswith(".pdf"):
        return extract_pdf_text(file_path)

    elif file_path.lower().endswith(".docx"):
        return extract_docx_text(file_path)

    else:
        return "Unsupported file format"