from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from . import models, schemas
from auth.dependencies import get_current_user, get_db
from .schemas import User
from .models import User as UserModel

router = APIRouter()

@router.get("/user", response_model=User)
def read_users_me(current_user: UserModel = Depends(get_current_user)):
    return current_user