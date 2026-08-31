from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from app.schemas.agent import AgentResult, TaskStatus

class BaseAgent(ABC):
    """Base class for all NEXA agents"""
    
    def __init__(self, name: str, tools: Optional[list] = None):
        self.name = name
        self.tools = tools or []
    
    @abstractmethod
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process the input and return output"""
        pass
    
    def run(self, task_id: int, input_data: Dict[str, Any]) -> AgentResult:
        """Wrapper that adds logging and error handling"""
        import time
        start = time.time()
        
        try:
            output = self.process(input_data)
            latency = (time.time() - start) * 1000
            return AgentResult(
                task_id=task_id,
                status=TaskStatus.COMPLETED,
                output=output,
                latency_ms=latency
            )
        except Exception as e:
            latency = (time.time() - start) * 1000
            return AgentResult(
                task_id=task_id,
                status=TaskStatus.FAILED,
                output={},
                error=str(e),
                latency_ms=latency
            )
