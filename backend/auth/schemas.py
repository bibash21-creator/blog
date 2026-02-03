from pydantic import BaseModel
from datetime import datetime

class MediaOut(BaseModel):
    id: int
    file_path: str
    file_type: str

    class Config:
        from_attributes = True

class StoryCreate(BaseModel):
    title: str
    content: str

class StoryOut(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime
    updated_at: datetime
    media: list[MediaOut] = []   # 👈 include media

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True