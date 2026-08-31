from typing import Dict, Any, List
from app.agents.base import BaseAgent

class PlannerAgent(BaseAgent):
    """Breaks down a goal into actionable steps"""
    
    def __init__(self):
        super().__init__(name="planner", tools=["llm", "schema"])
    
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Break goal into subtasks"""
        goal = input_data.get("goal", "")
        
        # In a real implementation, this would use an LLM
        # For now, provide a basic template
        steps = [
            {
                "title": f"Understand the goal: {goal}",
                "agent": "researcher",
                "tools": ["search"]
            },
            {
                "title": "Gather relevant information",
                "agent": "researcher",
                "tools": ["search", "rag"]
            },
            {
                "title": "Create structured plan",
                "agent": "planner",
                "tools": ["llm"]
            },
            {
                "title": "Execute plan",
                "agent": "supervisor",
                "tools": ["all"]
            }
        ]
        
        return {"plan": steps, "goal": goal}
