from models.users import User
from db.supabase import create_supabase_client
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import json
import shutil
import os
import mimetypes


def guess_mime_type(filename):
    mime, _ = mimetypes.guess_type(filename)
    return mime or "application/octet-stream"


app = FastAPI()

supabase = create_supabase_client()

origins = [
    "http://127.0.0.1:5173",
    "http://127.0.0.1"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/presentation/{pres_id}")
def presentation(pres_id):
    if pres_id == "36b7a0b1-7a63-4632-a95d-a179495f6236":
        with open('./mockdata.json', 'r') as file:
            return json.load(file)
    else:
        return {"error": "No presentation found"}


def user_exists(key: str = "email", value: str = None):
    user = supabase.from_("users").select("*").eq(key, value).execute()
    return len(user.data) > 0


@app.post("/user")
def create_user(user: User):
    try:
        user_email = user.email.lower()

        if user_exists(value=user_email):
            return {"message": "User Alread Exists"}

        user = supabase.from_("users")\
            .insert({"name": user.name, "email": user.email, "password": user.password})\
            .execute()

        if user:
            return {"message": "User was created sucessfully!"}
        else:
            return {"message": "Error: User was not created sucessfully"}
    except Exception as e:
        print("Error: ", e)
        return {"message": "User Creation Falied"}


@app.get("/list_buckets")
def getAllBuckets():
    try:
        buckets = supabase.storage.list_buckets()
        print(buckets)
        return {"message": str(buckets)}
    except Exception as e:
        print("Error: ", e)
        return {"message": "getAllBuckets: Retrieval Failed"}


@app.post("/upload")
async def uploadToBucket(
    ppt_file: UploadFile = File(...),
    audio_file: UploadFile = File(...)
):
    try:
        # Save PowerPoint file to temp
        ppt_path = f"/tmp/{ppt_file.filename}"
        with open(ppt_path, "wb") as buffer:
            shutil.copyfileobj(ppt_file.file, buffer)

        # Save audio file to temp
        audio_path = f"/tmp/{audio_file.filename}"
        with open(audio_path, "wb") as buffer:
            shutil.copyfileobj(audio_file.file, buffer)

        # Upload PowerPoint to Supabase
        with open(ppt_path, "rb") as file:
            supabase.storage.from_("raw-powerpoint").upload(
                path=f"uploads/{ppt_file.filename}",
                file=file,
                file_options={"upsert": "true",
                              "content-type": guess_mime_type(ppt_file.filename)
                              }
            )

        # Upload PowerPoint to Supabase
        with open(audio_path, "rb") as file:
            supabase.storage.from_("raw-audio").upload(
                path=f"uploads/{audio_file.filename}",
                file=file,
                file_options={
                    "upsert": "true", "content-type": guess_mime_type(audio_file.filename)}
            )

        os.remove(ppt_path)
        os.remove(audio_path)

        return {
            "message": "Files successfully uploaded to Supabase"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        return {"message": f"uploadToBucket: {e}"}
