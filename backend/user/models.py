from sqlalchemy import Boolean, Column, Integer, String, VARCHAR, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from auth.database import Base
from datetime import datetime



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username= Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(VARCHAR, unique=True,index=True,nullable= True)
    is_active = Column(Boolean, default=True)


    # 👇 This is critical
    stories = relationship("Story", back_populates="author")
