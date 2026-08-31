from typing import Dict, Any
from app.agents.base import BaseAgent

class VerifierAgent(BaseAgent):
    """Checks if the mission goal was actually completed"""
    
    def __init__(self):
        super().__init__(name="verifier", tools=["acceptance_checks", "llm"])
    
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Verify goal completion"""
        goal = input_data.get("goal", "")
        result = input_data.get("result", {})
        
        # Check if key outputs are present
        checks = []
        for key, value in result.items():
            if value is not None and value != "":
                checks.append({"check": f"Output '{key}' present", "passed": True})
            else:
                checks.append({"check": f"Output '{key}' missing", "passed": False})
        
        all_passed = all(c["passed"] for c in checks)
        
        return {
            "verified": all_passed,
            "checks": checks,
            "goal_completed": all_passed
        }
