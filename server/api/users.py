from fastapi import APIRouter
from models.users import User
from services.user_service import create_user_service, get_presentations
from typing import Annotated
from fastapi import Depends

import json
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/user")
def create_user(user: User):
    return create_user_service(user)


@router.get("/presentations")
def get_user_presentations(token: Annotated[str, Depends(oauth2_scheme)]):
    return get_presentations(token)


@router.get("/presentation/{pres_id}")
def presentation(pres_id):
    if pres_id == "36b7a0b1-7a63-4632-a95d-a179495f6236":
        with open('./mockdata.json', 'r') as file:
            return json.load(file)
    else:
        return {"error": "No presentation found"}
