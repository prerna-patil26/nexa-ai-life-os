from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class BaseTool(ABC):
    """Base class for all NEXA tools"""
    
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description
    
    @abstractmethod
    def execute(self, **kwargs) -> Dict[str, Any]:
        """Execute the tool with given parameters"""
        pass
    
    def validate_input(self, **kwargs) -> bool:
        """Basic validation - override for specific tools"""
        return True
