from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.agents.learning_agent import LearningAgent

router = APIRouter(prefix="/learning", tags=["learning"])

class LearningRequest(BaseModel):
    topic: str
    level: str = "beginner"
    knowledge_gaps: List[str] = []

class LearningResponse(BaseModel):
    topic: str
    level: str
    plan: List[Dict[str, Any]]
    estimated_hours: float
    recommended_resources: List[str]

@router.post("/plan", response_model=LearningResponse)
def create_learning_plan(request: LearningRequest):
    """Create a learning plan for a topic"""
    agent = LearningAgent()
    result = agent.process({
        "topic": request.topic,
        "level": request.level,
        "knowledge_gaps": request.knowledge_gaps
    })
    return result
