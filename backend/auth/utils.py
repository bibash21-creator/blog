from passlib.context import CryptContext
from jose import  jwt
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from user.models import RefreshToken
import uuid

SECRET_KEY = "9E7B4A3EC1BDD76D7DD235CCEB1D2B26" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 20

pwd_context = CryptContext(schemes=["argon2"], deprecated = "auto")

def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict,expires_delta: timedelta | None = None):
    to_encode= data.copy()
    if expires_delta:
        expire = datetime.utcnow()+ expires_delta
    else:
        expire = datetime.utcnow()+ timedelta(ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "exp": expire,
        "type": "access"})
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

    return encoded_jwt

def create_refresh_token(data: dict, db: Session, expires_delta: timedelta = timedelta(days=3)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    
    jti = str(uuid.uuid4())
    to_encode.update({"exp": expire, "jti": jti, "type": "refresh"})
    
    db_refresh = RefreshToken(jti=jti, user_id=int(data["sub"]), expires_at=expire)
    db.add(db_refresh)
    db.commit()
    
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)