from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import random

router = APIRouter(prefix="/travel", tags=["travel"])

@router.post("/plan")
def plan_trip(data: Dict[str, Any]):
    """Generate a trip itinerary"""
    try:
        destination = data.get("destination", "")
        days = data.get("days", 3)
        budget = data.get("budget")
        preferences = data.get("preferences", "")
        
        if not destination:
            raise HTTPException(status_code=400, detail="Destination required")
        
        # Generate day-wise itinerary
        days_plan = []
        total_budget = 0
        
        for day in range(1, days + 1):
            activities = []
            
            # Morning activity
            activities.append({
                "type": "activity",
                "name": self._get_morning_activity(destination, day),
                "duration": 3
            })
            
            # Food
            activities.append({
                "type": "food",
                "name": self._get_food_activity(destination, day),
                "duration": 2
            })
            
            # Afternoon/Evening activity
            activities.append({
                "type": "activity",
                "name": self._get_evening_activity(destination, day),
                "duration": 3
            })
            
            # Stay
            activities.append({
                "type": "stay",
                "name": "Hotel stay - " + self._get_hotel(destination),
                "duration": 8
            })
            
            # Daily budget estimate
            daily_budget = self._estimate_daily_budget(budget, days)
            total_budget += daily_budget
            
            days_plan.append({
                "day": day,
                "title": f"Day {day} - Explore {destination}",
                "activities": activities,
                "daily_budget": daily_budget
            })
        
        # Total budget
        if budget:
            estimated_budget = budget
        else:
            estimated_budget = total_budget
        
        # Tips
        tips = [
            "Book accommodation in advance for better rates",
            "Try local street food for authentic experience",
            "Carry cash for small vendors",
            "Check weather forecast before packing",
            "Download offline maps for navigation"
        ]
        
        return {
            "destination": destination,
            "days": days,
            "estimated_budget": estimated_budget,
            "days_plan": days_plan,
            "tips": tips,
            "preferences": preferences
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def _get_morning_activity(destination: str, day: int) -> str:
    activities = [
        f"Visit {destination} famous temple/church",
        f"Explore local market at {destination}",
        f"Sunrise photography at {destination} beach/hill",
        f"Heritage walk in {destination} old town",
        f"Nature trek near {destination}"
    ]
    return activities[(day - 1) % len(activities)]

def _get_food_activity(destination: str, day: int) -> str:
    foods = [
        f"Breakfast at popular {destination} café",
        f"Lunch at traditional {destination} restaurant",
        f"Snack break at local street food stall",
        f"Dinner at rooftop restaurant in {destination}",
        f"Try {destination} specialty cuisine"
    ]
    return foods[(day - 1) % len(foods)]

def _get_evening_activity(destination: str, day: int) -> str:
    activities = [
        f"Sunset at {destination} viewpoint",
        f"Cultural show in {destination}",
        f"Night market visit in {destination}",
        f"Beach evening at {destination}",
        f"City night tour of {destination}"
    ]
    return activities[(day - 1) % len(activities)]

def _get_hotel(destination: str) -> str:
    hotels = [
        "Premium Hotel",
        "Budget Stay",
        "Resort",
        "Homestay",
        "Boutique Hotel"
    ]
    return random.choice(hotels)

def _estimate_daily_budget(total_budget: float, days: int) -> float:
    if total_budget:
        return round(total_budget / days, 0)
    # Default estimate if no budget provided
    return random.randint(2000, 5000)