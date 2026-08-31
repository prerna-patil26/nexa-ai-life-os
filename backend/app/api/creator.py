from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import random

router = APIRouter(prefix="/creator", tags=["creator"])

@router.post("/analyze")
def analyze_content(data: Dict[str, Any]):
    """Analyze content for engagement and audience insights"""
    try:
        content = data.get("content", "")
        content_type = data.get("type", "text")
        
        if not content:
            raise HTTPException(status_code=400, detail="Content required")
        
        # Simple analysis based on content length and keywords
        word_count = len(content.split())
        
        # Detect strong hooks
        hooks = []
        if any(word in content.lower() for word in ['how', 'why', 'secret', 'revealed', 'mistake']):
            hooks.append("Strong hook detected - curiosity-driven opening")
        if any(word in content.lower() for word in ['you', 'your', 'yourself']):
            hooks.append("Direct audience addressing detected")
        if '!' in content:
            hooks.append("Emotional trigger present - exclamation detected")
        
        if not hooks:
            hooks.append("Consider adding a curiosity-driven opening hook")
        
        # Pacing analysis
        if word_count < 50:
            pacing = "Short content - good for quick consumption"
        elif word_count < 150:
            pacing = "Medium length - balanced for most platforms"
        else:
            pacing = "Long content - consider breaking into parts for better engagement"
        
        # Generate engagement score (mock based on content features)
        base_score = 50
        if hooks:
            base_score += 15
        if word_count > 100:
            base_score += 10
        if 'call to action' in content.lower() or 'follow' in content.lower() or 'subscribe' in content.lower():
            base_score += 10
        if any(word in content.lower() for word in ['amazing', 'incredible', 'best', 'top']):
            base_score += 10
        
        engagement_score = min(base_score, 95)
        
        # Audience insights
        audience_insights = [
            "Content appeals to tech-savvy audience",
            "Strong potential for shares if visual elements added",
            "Consider adding personal story for better connection"
        ]
        
        # Suggestions
        suggestions = [
            "Add a clear call-to-action at the end",
            "Break text into smaller paragraphs for readability",
            "Add relevant hashtags to increase discoverability",
            "Include visual elements or images",
            "Post during peak engagement hours (6-9 PM)"
        ]
        
        return {
            "content_type": content_type,
            "word_count": word_count,
            "engagement_score": engagement_score,
            "hooks": hooks,
            "pacing": pacing,
            "audience_insights": audience_insights,
            "suggestions": suggestions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-video")
def analyze_video(data: Dict[str, Any]):
    """Analyze video content (mock implementation)"""
    try:
        video_name = data.get("filename", "unknown")
        
        # Mock analysis
        return {
            "filename": video_name,
            "engagement_score": 72,
            "hooks": ["Strong opening scene detected"],
            "pacing": "Good pacing - 3 key moments identified",
            "audience_insights": [
                "Audience retention likely high in first 30 seconds",
                "Content type performs well on short-form platforms"
            ],
            "suggestions": [
                "Add text overlays for key points",
                "Include a hook in first 3 seconds",
                "Optimize thumbnail for better CTR"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))