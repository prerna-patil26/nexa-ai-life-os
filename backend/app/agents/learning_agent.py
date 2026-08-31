from typing import Dict, Any, List
from app.agents.base import BaseAgent

class LearningAgent(BaseAgent):
    """Create adaptive learning plans and track progress"""
    
    def __init__(self):
        super().__init__(name="learning", tools=["rag", "quiz", "analytics"])
    
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create learning plan based on user goals and knowledge gaps"""
        topic = input_data.get("topic", "")
        user_level = input_data.get("level", "beginner")
        knowledge_gaps = input_data.get("knowledge_gaps", [])
        
        # Create learning plan
        plan = self._create_learning_plan(topic, user_level, knowledge_gaps)
        
        return {
            "topic": topic,
            "level": user_level,
            "plan": plan,
            "estimated_hours": self._estimate_hours(plan),
            "recommended_resources": self._get_resources(topic)
        }
    
    def _create_learning_plan(self, topic: str, level: str, gaps: List[str]) -> List[Dict[str, Any]]:
        """Create a structured learning plan"""
        plan = []
        
        # Beginner level
        if level == "beginner":
            plan.append({
                "step": 1,
                "title": f"Introduction to {topic}",
                "type": "concept",
                "duration_minutes": 30
            })
            plan.append({
                "step": 2,
                "title": f"Core concepts of {topic}",
                "type": "concept",
                "duration_minutes": 60
            })
            plan.append({
                "step": 3,
                "title": f"Hands-on practice with {topic}",
                "type": "practice",
                "duration_minutes": 90
            })
        
        # Intermediate level
        elif level == "intermediate":
            plan.append({
                "step": 1,
                "title": f"Advanced concepts in {topic}",
                "type": "concept",
                "duration_minutes": 45
            })
            plan.append({
                "step": 2,
                "title": f"Project: Build something with {topic}",
                "type": "project",
                "duration_minutes": 120
            })
            plan.append({
                "step": 3,
                "title": f"Review and quiz on {topic}",
                "type": "assessment",
                "duration_minutes": 30
            })
        
        # Advanced level
        else:
            plan.append({
                "step": 1,
                "title": f"Expert topics in {topic}",
                "type": "concept",
                "duration_minutes": 60
            })
            plan.append({
                "step": 2,
                "title": f"Build a production-level {topic} project",
                "type": "project",
                "duration_minutes": 180
            })
            plan.append({
                "step": 3,
                "title": f"Optimize and deploy {topic} solution",
                "type": "practice",
                "duration_minutes": 90
            })
        
        # Add knowledge gap specific steps
        for i, gap in enumerate(gaps):
            plan.append({
                "step": len(plan) + 1,
                "title": f"Address knowledge gap: {gap}",
                "type": "targeted",
                "duration_minutes": 45
            })
        
        return plan
    
    def _estimate_hours(self, plan: List[Dict[str, Any]]) -> float:
        """Estimate total learning hours"""
        total_minutes = sum(step["duration_minutes"] for step in plan)
        return round(total_minutes / 60, 1)
    
    def _get_resources(self, topic: str) -> List[str]:
        """Get recommended learning resources"""
        return [
            f"Official documentation for {topic}",
            f"Online course: {topic} fundamentals",
            f"Practice exercises for {topic}",
            f"Community forums and discussions",
            f"Project ideas for {topic}"
        ]
