from fastapi import APIRouter, UploadFile, File
import shutil
import os

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"

# Create uploads folder if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    # File validation
    allowed_extensions = [".pdf", ".docx"]

    file_extension = os.path.splitext(
        file.filename
    )[1]

    if file_extension not in allowed_extensions:

        return {
            "success": False,
            "message": "Only PDF or DOCX files allowed"
        }

    # Save file path
    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    # Save file
    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {

        "success": True,
        "message": "Resume uploaded successfully 🚀",

        "filename": file.filename
    }