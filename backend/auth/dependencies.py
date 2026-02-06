

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from .utils import verify_password, SECRET_KEY, ALGORITHM
from .models import TokenData
from user.models import User
from .database import SessionLocal, engine, Base



Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    
    finally: 
        db.close()

def get_user(db: Session, identifier: str):
    return db.query(User).filter((User.username == identifier) | (User.email == identifier)).first()

def authenticate_user(db: Session, identifier: str, password:str):
    user= get_user(db, identifier)
    if not user:
        return False
    if not verify_password(password,user.hashed_password):
        return False
    
    return user

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type") # <--- 1. Get the type from payload

        # 2. Check if user_id exists AND if the type is specifically 'access'
        if user_id is None or token_type != "access":
            raise credentials_exception
            
        token_data = TokenData(user_id=int(user_id), type=token_type)
        
    except (JWTError, ValueError): # Catch JWT errors or int conversion errors
        raise credentials_exception

    user = db.query(User).filter(User.id == token_data.user_id).first()
    if user is None:
        raise credentials_exception
        
    return user
