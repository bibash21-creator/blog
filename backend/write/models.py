from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy .orm import relationship
from datetime import datetime
from auth.database import Base

class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key= True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default = datetime.utcnow)
    updated_at = Column(DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)


    author = relationship("User", back_populates ="stories")