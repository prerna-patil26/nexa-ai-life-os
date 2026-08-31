from typing import Dict, Any, Optional
from app.agents.base import BaseAgent
from app.schemas.agent import AgentType

class SupervisorAgent(BaseAgent):
    """Main agent that routes tasks to appropriate specialist agents"""
    
    def __init__(self):
        super().__init__(name="supervisor", tools=["router", "planner"])
        self.agent_registry = {}
    
    def register_agent(self, agent_type: AgentType, agent: BaseAgent):
        """Register a specialist agent"""
        self.agent_registry[agent_type] = agent
    
    def route(self, task_type: str) -> Optional[BaseAgent]:
        """Route to the appropriate agent based on task type"""
        return self.agent_registry.get(task_type)
    
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Main routing logic"""
        task_type = input_data.get("type", "general")
        agent = self.route(task_type)
        
        if agent:
            return {
                "routed_to": agent.name,
                "result": agent.process(input_data)
            }
        else:
            return {
                "routed_to": None,
                "error": f"No agent found for task type: {task_type}"
            }
