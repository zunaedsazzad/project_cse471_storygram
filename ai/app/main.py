from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from .routers import chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat.router)