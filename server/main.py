# from typing import Annotated

from api import users, presentations, uploads

# from models.profile import Profile
# from db.supabase import create_supabase_client
from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

# import json
# import shutil
# import os


app = FastAPI()

# This tells FastAPI to expect a Bearer token in the Authorization header
# You don't need to implement the /token endpoint unless you want full login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

app.include_router(users.router)
app.include_router(presentations.router)

"""
supabase = create_supabase_client()


@app.get("/presentations")
def presentations():
    # token: Annotated[str, Depends(oauth2_scheme)]
    # print(token)
    # user = supabase.auth.get_user(token)
    profile = ((supabase.schema("public").table(
        "profiles").select("*").execute()).data)[0]
    print(profile)
    user = Profile.parse_obj(profile)
    print(user.presentations)
    return {"profiles": ""}


@app.get("/presentation/{pres_id}")
def presentation(pres_id):
    if pres_id == "36b7a0b1-7a63-4632-a95d-a179495f6236":
        with open('./mockdata.json', 'r') as file:
            return json.load(file)
    else:
        return {"error": "No presentation found"}


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
                              "content-type":
                              guess_mime_type(ppt_file.filename)
                              }
            )

        # Upload PowerPoint to Supabase
        with open(audio_path, "rb") as file:
            supabase.storage.from_("raw-audio").upload(
                path=f"uploads/{audio_file.filename}",
                file=file,
                file_options={
                    "upsert": "true", "content-type":
                    guess_mime_type(audio_file.filename)}
            )

        os.remove(ppt_path)
        os.remove(audio_path)

        return {
            "message": "Files successfully uploaded to Supabase"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        return {"message": f"uploadToBucket: {e}"}
"""
