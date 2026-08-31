from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.agents.career_agent import CareerAgent

router = APIRouter(prefix="/career", tags=["career"])

class CareerRequest(BaseModel):
    jd_text: str
    user_profile: Dict[str, Any] = {}

class CareerResponse(BaseModel):
    jd_skills: List[str]
    user_skills: List[str]
    missing_skills: List[str]
    match_score: float
    recommendations: List[str]

@router.post("/analyze", response_model=CareerResponse)
def analyze_career(request: CareerRequest):
    """Analyze job description and identify skill gaps"""
    agent = CareerAgent()
    result = agent.process({
        "jd_text": request.jd_text,
        "user_profile": request.user_profile
    })
    return result
