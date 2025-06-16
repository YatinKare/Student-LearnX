from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import json

app = FastAPI()

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
        with open('./mockdata.js', 'r') as file:
            return json.load(file)
    else: return {"error": "No presentation found"}
