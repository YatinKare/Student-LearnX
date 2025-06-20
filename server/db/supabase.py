from supabase import Client, create_client
from dotenv import dotenv_values

secrets = dotenv_values(".env")

api_url: str = secrets["SUPABASE_URL"]
key: str = secrets["SUPABASE_API_KEY"]


def create_supabase_client():
    supabase: Client = create_client(api_url, key)
    return supabase
