from typing import Dict, Any, List
from app.agents.base import BaseAgent

class CareerAgent(BaseAgent):
    """Analyze job descriptions and identify skill gaps"""
    
    def __init__(self):
        super().__init__(name="career", tools=["nlp", "search", "rag"])
    
    def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze job description and compare with profile"""
        jd_text = input_data.get("jd_text", "")
        user_profile = input_data.get("user_profile", {})
        
        # Extract skills from JD
        jd_skills = self._extract_skills(jd_text)
        
        # Extract skills from user profile
        user_skills = set(user_profile.get("skills", []))
        
        # Find skill gaps
        missing_skills = jd_skills - user_skills
        
        # Calculate match score
        if jd_skills:
            match_score = len(user_skills & jd_skills) / len(jd_skills) * 100
        else:
            match_score = 0
        
        return {
            "jd_skills": list(jd_skills),
            "user_skills": list(user_skills),
            "missing_skills": list(missing_skills),
            "match_score": match_score,
            "recommendations": self._generate_recommendations(missing_skills)
        }
    
    def _extract_skills(self, text: str) -> set:
        """Extract skills from job description text"""
        # Common tech skills
        common_skills = [
            'python', 'java', 'javascript', 'typescript', 'react', 'node.js',
            'sql', 'mongodb', 'postgresql', 'aws', 'azure', 'docker',
            'kubernetes', 'machine learning', 'deep learning', 'nlp',
            'computer vision', 'tensorflow', 'pytorch', 'fastapi',
            'django', 'flask', 'git', 'linux', 'ci/cd', 'agile',
            'data analysis', 'pandas', 'numpy', 'scikit-learn',
            'openai', 'langchain', 'rag', 'transformers'
        ]
        
        text_lower = text.lower()
        found_skills = set()
        
        for skill in common_skills:
            if skill in text_lower:
                found_skills.add(skill)
        
        return found_skills
    
    def _generate_recommendations(self, missing_skills: set) -> List[str]:
        """Generate learning recommendations for missing skills"""
        recommendations = []
        for skill in missing_skills:
            recommendations.append(f"Learn {skill} to improve your profile match")
        return recommendations
