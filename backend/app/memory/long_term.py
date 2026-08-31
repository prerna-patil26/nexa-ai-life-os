from sqlalchemy.orm import Session
from typing import Dict, Any, Optional, List
from app.db.models import Memory

class LongTermMemory:
    """Store and retrieve user preferences, goals, and history"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def store(self, user_id: int, memory_type: str, content: str, importance: float = 0.5) -> Memory:
        """Store a memory item"""
        memory = Memory(
            user_id=user_id,
            memory_type=memory_type,
            content=content,
            importance=importance
        )
        self.db.add(memory)
        self.db.commit()
        self.db.refresh(memory)
        return memory
    
    def retrieve(self, user_id: int, memory_type: Optional[str] = None, limit: int = 10) -> List[Memory]:
        """Retrieve memories for a user"""
        query = self.db.query(Memory).filter(Memory.user_id == user_id)
        
        if memory_type:
            query = query.filter(Memory.memory_type == memory_type)
        
        return query.order_by(Memory.importance.desc()).limit(limit).all()
    
    def delete(self, memory_id: int) -> bool:
        """Delete a memory"""
        memory = self.db.query(Memory).filter(Memory.id == memory_id).first()
        if memory:
            self.db.delete(memory)
            self.db.commit()
            return True
        return False
    
    def clear_user_memory(self, user_id: int) -> int:
        """Clear all memories for a user"""
        deleted = self.db.query(Memory).filter(Memory.user_id == user_id).delete()
        self.db.commit()
        return deleted
