
from pydantic import BaseModel, EmailStr
from typing import Optional

# --- Response Models ---

class Token(BaseModel):
    """The schema for the login response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    """The schema for the data stored inside the token payload"""
    username: Optional[str] = None
    user_id: Optional[int] = None
    # 'type' is critical to distinguish access vs refresh tokens
    type: str 
    # 'jti' is the unique identifier used for DB lookup
    jti: Optional[str] = None

