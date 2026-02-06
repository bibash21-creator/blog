from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt 
from datetime import datetime

from .dependencies import get_db, authenticate_user
from .models import Token
from user.models import RefreshToken
from .schemas import UserCreate, UserResponse
from user.models import User
from .utils import get_password_hash, create_access_token, create_refresh_token 
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate BOTH tokens
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)}, db=db)
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token, 
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
def refresh_access_token(refresh_token: str, db: Session = Depends(get_db)):
    try:
        # 1. Decode the token (utils.SECRET_KEY should be imported or available)
        from .utils import SECRET_KEY, ALGORITHM
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        
        jti = payload.get("jti")
        user_id = payload.get("sub")
        token_type = payload.get("type")

        # 2. Validation
        if token_type != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")

        # 3. Check DB for JTI and Revocation
        db_token = db.query(RefreshToken).filter(RefreshToken.jti == jti).first()
        if not db_token or db_token.revoked or db_token.expires_at < datetime.utcnow():
            raise HTTPException(status_code=401, detail="Refresh token expired or revoked")

        # 4. Token Rotation (Revoke old one)
        db_token.revoked = True
        db.commit()

        # 5. Issue new pair
        new_access = create_access_token(data={"sub": user_id})
        new_refresh = create_refresh_token(data={"sub": user_id}, db=db)

        return {
            "access_token": new_access, 
            "refresh_token": new_refresh, 
            "token_type": "bearer"
        }

    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# ... signup remains the same ...


@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # db_user = get_user(db, username=user.username)
    db_user=db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username,email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Logs out the user by revoking the refresh token associated with the 
    current session or simply the specific JTI provided.
    """
    try:
        from .utils import SECRET_KEY, ALGORITHM
        # 1. Decode the token provided in the Header
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        jti = payload.get("jti")
        
        if not jti:
            # If the token doesn't have a JTI (like a basic access token), 
            # we can't revoke it in the DB, so we just return.
            return

        # 2. Find the token in the DB and mark as revoked
        db_token = db.query(RefreshToken).filter(RefreshToken.jti == jti).first()
        if db_token:
            db_token.revoked = True
            db.commit()
            
        return None # 204 No Content has no body

    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")