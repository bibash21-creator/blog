from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from auth.database import Base

class Story(Base):
    __tablename__  = "stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    author = relationship("User", back_populates="stories")
    media = relationship("Media", back_populates="story", cascade="all, delete-orphan")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: int | None = None

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("stories.id"), nullable=False)
    file_path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)  # "image", "video", "audio"
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    story = relationship("Story", back_populates="media")