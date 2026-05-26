from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.resume_parser import parse_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# =========================
# UPLOAD RESUME
# =========================
@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from resume
    extracted_text = parse_resume(file_path)

    return {
        "success": True,
        "message": "Resume uploaded successfully 🚀",
        "filename": file.filename,
        "resume_text": extracted_text[:3000]
    }