from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Mission(Base):
    __tablename__ = 'missions'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String, nullable=False)
    description = Column(Text)
    goal = Column(Text)
    status = Column(String, default='active')
    progress = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True, index=True)
    mission_id = Column(Integer, ForeignKey('missions.id'))
    title = Column(String, nullable=False)
    status = Column(String, default='pending')
    agent_type = Column(String)
    tool_name = Column(String)
    result = Column(Text)
    verification_status = Column(String, default='pending')
    dependencies = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AgentLog(Base):
    __tablename__ = 'agent_logs'
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey('tasks.id'))
    agent_name = Column(String)
    action = Column(String)
    input_data = Column(JSON)
    output_data = Column(JSON)
    success = Column(Boolean, default=True)
    latency_ms = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Document(Base):
    __tablename__ = 'documents'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    filename = Column(String)
    file_type = Column(String)
    content = Column(Text)
    embeddings = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Memory(Base):
    __tablename__ = 'memory'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    memory_type = Column(String)
    content = Column(Text)
    importance = Column(Float, default=0.5)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
