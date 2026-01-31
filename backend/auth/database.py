from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Encode special characters in password (e.g., @ → %40)
db_url = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:B1b%40sh%40321@localhost:5432/blog_database"
)

engine = create_engine(db_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()