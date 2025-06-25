import uuid
from pydantic import BaseModel


class Profile(BaseModel):
    id: uuid.UUID
    display_name: str
    email: str
    phone: str | None
    created_at: str | None
    last_sign_in_at: str | None
    presentations: list[uuid.UUID]
    needs_folder_setup: bool


def s3_folder_init():
    print("setting folder forH")
