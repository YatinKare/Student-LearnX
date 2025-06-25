from db.supabase import create_supabase_client
from utils.file_utils import guess_mime_type
import uuid
import os

supabase = create_supabase_client()


def get_user_jwt(token):
    user = supabase.auth.get_user(token)
    return user


def get_profile(user_uuid: str):
    return ((supabase.schema("public").table(
        "profiles").select("*").eq("id", user_uuid).execute()).data)[0]


def create_presentation_folder(user_uuid: uuid.UUID):
    presentation_path = os.getcwd() + "/resources/example.pptx"
    with open(presentation_path, "rb") as file:
        response = (
            supabase.storage
            .from_("presentations")
            .upload(
                file=file,
                path=f"{user_uuid}/example.pptx",
                file_options={"upsert": "false",
                              "content-type": guess_mime_type(presentation_path)
                              }
            )

        )
    if response:
        return response.full_path


def create_audio_folder(user_uuid: uuid.UUID):
    audio_path = os.getcwd() + "/resources/example.mp3"
    with open(audio_path, "rb") as file:
        response = (
            supabase.storage
            .from_("audio")
            .upload(
                file=file,
                path=f"{user_uuid}/example.mp3",
                file_options={"upsert": "false",
                              "content-type": guess_mime_type(audio_path)}
            )

        )
    if response:
        return response.full_path


def add_presentation_table_new(presentation_path: str,
                               audio_path: str,
                               presentation_table_uuid: uuid.UUID,
                               user_uuid: uuid.UUID,
                               title: str = "Example Presentation"):
    presentation_reponse = (
        supabase.schema("public").table("presentations").update({
            "title": title,
            "presentation_path": presentation_path,
            "audio_path": audio_path
        }).eq("id", presentation_table_uuid).execute()
    )

    profile_response = (
        supabase.schema("public").table("profiles").update({
            "presentations": [presentation_table_uuid],
            "needs_folder_setup": False
        }).eq("id", user_uuid).execute()
    )
    if presentation_reponse and profile_response:
        return presentation_table_uuid


def generate_presentation_table():
    response = (
        supabase.schema("public").table("presentations").insert({
            "title": "",
            "presentation_path": "",
            "audio_path": ""
        }).execute()
    )

    return response.data[0]['id']
    pass


def user_exists(key: str = "email", value: str = None):
    user = supabase.from_("users").select("*").eq(key, value).execute()
    return len(user.data) > 0


def insert_user(user):
    return supabase.from_("users").insert({
        "name": user.name,
        "email": user.email,
        "password": user.password
    }).execute()
