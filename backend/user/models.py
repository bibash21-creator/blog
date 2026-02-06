from sqlalchemy import Boolean, Column, DateTime, Integer, String, VARCHAR, ForeignKey
from auth.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username= Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(VARCHAR, unique=True,index=True,nullable= True)
    is_active = Column(Boolean, default=True)

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    # The unique fingerprint of the token (JTI)
    jti = Column(String, unique=True, index=True, nullable=False)
    # Link it to the user
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    expires_at = Column(DateTime, nullable=False)
    # Allows you to "kill" a session manually
    revoked = Column(Boolean, default=False)