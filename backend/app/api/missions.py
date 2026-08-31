from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.init_db import get_db
from app.db.models import Mission, Task
from app.schemas.mission import MissionCreate, MissionResponse, TaskCreate, TaskResponse

router = APIRouter(prefix="/missions", tags=["missions"])

@router.post("/", response_model=MissionResponse)
def create_mission(mission: MissionCreate, db: Session = Depends(get_db)):
    db_mission = Mission(
        title=mission.title,
        description=mission.description,
        goal=mission.goal,
        status="active",
        progress=0.0
    )
    db.add(db_mission)
    db.commit()
    db.refresh(db_mission)
    return db_mission

@router.get("/", response_model=List[MissionResponse])
def get_missions(db: Session = Depends(get_db)):
    return db.query(Mission).all()

@router.get("/{mission_id}", response_model=MissionResponse)
def get_mission(mission_id: int, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission

@router.post("/{mission_id}/tasks", response_model=TaskResponse)
def create_task(mission_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    db_task = Task(
        mission_id=mission_id,
        title=task.title,
        agent_type=task.agent_type,
        tool_name=task.tool_name,
        status="pending",
        verification_status="pending"
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/{mission_id}/tasks", response_model=List[TaskResponse])
def get_tasks(mission_id: int, db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.mission_id == mission_id).all()
