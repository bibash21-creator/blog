

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from auth.routes import router as auth_router
from user.routes import router as users_router

app = FastAPI()

# Allow frontend origin
origins = [
    "http://localhost:3000",  # Next.js dev server
    "http://127.0.0.1:3000",
    # Add production domain here later, e.g. "https://myapp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # which origins can call the API
    allow_credentials=True,         # allow cookies/headers
    allow_methods=["*"],            # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # allow all headers
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(users_router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI authentication and authorization example"}

