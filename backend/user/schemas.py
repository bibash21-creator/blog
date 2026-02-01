from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email:  str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class PostCreate(BaseModel):
    content: str

class PostResponse(BaseModel):
    id: int
    content: str
    author_id: int
    created_at: datetime