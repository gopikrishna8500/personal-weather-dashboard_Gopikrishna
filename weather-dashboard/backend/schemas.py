from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class LocationUpdate(BaseModel):
    city: Optional[str]
    country: Optional[str]
    latitude: Optional[str]
    longitude: Optional[str]
