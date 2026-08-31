from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.init_db import init_db
from app.api.missions import router as missions_router
from app.api.career import router as career_router
from app.api.learning import router as learning_router
from app.api.vision import router as vision_router
from app.api.documents import router as documents_router
from app.api.creator import router as creator_router

app = FastAPI(
    title="NEXA AI Life OS",
    description="Multimodal AI Agentic Platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(missions_router)
app.include_router(career_router)
app.include_router(learning_router)
app.include_router(vision_router)
app.include_router(documents_router)
app.include_router(creator_router)

@app.get("/")
def root():
    return {"message": "NEXA AI Life OS API is running"}

@app.get("/health")
def health():
    return {"status": "ok", "version": "0.1.0"}