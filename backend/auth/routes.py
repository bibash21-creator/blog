from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .dependencies import get_db, authenticate_user, get_user, get_current_user
from .models import Token
from .schemas import UserCreate, UserResponse
from user.models import User
from .utils import get_password_hash, create_access_token
from auth import models, schemas
import os

router = APIRouter()

# ---------------- AUTH ---------------- #

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ---------------- POSTS ---------------- #

@router.post("/posts", response_model=schemas.StoryOut)
def create_post(story: schemas.StoryCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not story.title.strip() or not story.content.strip():
        raise HTTPException(status_code=400, detail="Title and content cannot be empty")

    new_story = models.Story(title=story.title, content=story.content, author_id=user.id)
    db.add(new_story)
    db.commit()
    db.refresh(new_story)
    return new_story


@router.get("/posts", response_model=list[schemas.StoryOut])
def get_posts(db: Session = Depends(get_db)):
    return db.query(models.Story).order_by(models.Story.created_at.desc()).all()


@router.get("/posts/{story_id}", response_model=schemas.StoryOut)
def get_post(story_id: int, db: Session = Depends(get_db)):
    story = db.query(models.Story).filter(models.Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story

# ---------------- POSTS WITH MEDIA ---------------- #

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/posts-with-media", response_model=schemas.StoryOut)
async def create_post_with_media(
    title: str = Form(...),
    content: str = Form(...),
    files: list[UploadFile] = File(None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    if not title.strip() or not content.strip():
        raise HTTPException(status_code=400, detail="Title and content cannot be empty")

    new_story = models.Story(title=title, content=content, author_id=user.id)
    db.add(new_story)
    db.commit()
    db.refresh(new_story)

    if files:
        for file in files:
            file_location = os.path.join(UPLOAD_DIR, file.filename)
            with open(file_location, "wb") as f:
                f.write(await file.read())

            media_entry = models.Media(
                story_id=new_story.id,
                file_path=file_location,
                file_type=file.content_type.split("/")[0]  # "image" or "video"
            )
            db.add(media_entry)

        db.commit()

    return new_story




@router.get("/users/{user_id}/posts", response_model=list[schemas.StoryOut])
def get_user_posts(user_id: int, db: Session = Depends(get_db)):
    return (
        db.query(models.Story)
        .filter(models.Story.author_id == user_id)
        .order_by(models.Story.created_at.desc())
        .all()
    )

@router.put("/posts/{story_id}", response_model=schemas.StoryOut)
def update_post(story_id: int, updated_story: schemas.StoryCreate,
                db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    story = db.query(models.Story).filter(models.Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    if story.author_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    story.title = updated_story.title
    story.content = updated_story.content
    db.commit()
    db.refresh(story)
    return story



@router.delete("/posts/{story_id}")
def delete_post(story_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    story = db.query(models.Story).filter(models.Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    if story.author_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    db.delete(story)
    db.commit()
    return {"detail": "Story deleted successfully"}