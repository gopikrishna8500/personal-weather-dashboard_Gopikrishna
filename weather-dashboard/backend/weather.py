from fastapi import APIRouter, HTTPException
import requests
from urllib.parse import quote_plus

router = APIRouter()

@router.get("/weather")
def get_weather(city: str):
    city = quote_plus(city.strip())
    api_key = "499a07096cd538a168680d155ce4bc52"  # ✅ Use your actual API key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found")

    return response.json()
