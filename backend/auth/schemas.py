from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    """The schema returned when fetching user info"""
    id: int
    is_active: bool

    class Config:
        from_attributes = True # Allows Pydantic to read SQLAlchemy models
