from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class MissionCreate(BaseModel):
    title: str
    description: Optional[str] = None
    goal: str

class MissionResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    goal: str
    status: str
    progress: float
    created_at: datetime

    class Config:
        from_attributes = True

class TaskCreate(BaseModel):
    title: str
    agent_type: Optional[str] = None
    tool_name: Optional[str] = None
    dependencies: Optional[List[int]] = []

class TaskResponse(BaseModel):
    id: int
    mission_id: int
    title: str
    status: str
    agent_type: Optional[str] = None
    tool_name: Optional[str] = None
    result: Optional[str] = None
    verification_status: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
