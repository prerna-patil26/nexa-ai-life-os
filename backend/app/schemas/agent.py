from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from enum import Enum

class AgentType(str, Enum):
    SUPERVISOR = "supervisor"
    PLANNER = "planner"
    RESEARCHER = "researcher"
    VISION = "vision"
    DATA = "data"
    CAREER = "career"
    LEARNING = "learning"
    CREATOR = "creator"
    DEVELOPER = "developer"
    CRITIC = "critic"
    VERIFIER = "verifier"

class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    NEEDS_APPROVAL = "needs_approval"

class MissionRequest(BaseModel):
    goal: str
    user_id: int
    context: Optional[Dict[str, Any]] = None

class TaskCreate(BaseModel):
    title: str
    agent_type: AgentType
    tools: List[str] = []
    dependencies: List[int] = []
    verification_condition: Optional[str] = None

class AgentResult(BaseModel):
    task_id: int
    status: TaskStatus
    output: Dict[str, Any]
    error: Optional[str] = None
    latency_ms: Optional[float] = None

class MissionResponse(BaseModel):
    mission_id: int
    plan: List[TaskCreate]
    status: str
    message: str
