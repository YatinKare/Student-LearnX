from models.profile import Profile
from repository.user_repo import get_user_jwt, get_profile, create_presentation_folder, create_audio_folder, add_presentation_table_new, generate_presentation_table
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
import uuid
from fastapi import Depends

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_presentations(token: Annotated[str, Depends(oauth2_scheme)]):
    user = get_user_jwt(token)

    profile = get_profile(user.user.id)
    print(profile)
    user = Profile.parse_obj(profile)

    if user.needs_folder_setup:
        try:
            new_presentation_uuid = user_folder_setup(user.id)
            return {"presentations": [new_presentation_uuid]}
        except Exception as e:
            print(f"Error: {e}")
            raise

    return {"presentations": user.presentations}


def create_user_service(user):
    return user


def user_folder_setup(user_uuid: uuid.UUID):
    presentation_table_uuid = generate_presentation_table()
    presentation_path = create_presentation_folder(user_uuid)
    audio_path = create_audio_folder(user_uuid)
    add_presentation_table_new(
        presentation_path, audio_path, presentation_table_uuid, user_uuid)
    return presentation_table_uuid
