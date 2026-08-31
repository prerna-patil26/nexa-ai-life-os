from typing import Dict, Any
import httpx
from app.tools.base import BaseTool

class BrowserTool(BaseTool):
    """Fetch web content (simplified)"""
    
    def __init__(self):
        super().__init__(
            name="browser",
            description="Fetch and extract content from websites"
        )
    
    def execute(self, url: str, **kwargs) -> Dict[str, Any]:
        try:
            response = httpx.get(url, timeout=10, follow_redirects=True)
            return {
                "status_code": response.status_code,
                "content": response.text[:5000]  # Limit to 5000 chars
            }
        except Exception as e:
            return {"error": str(e)}
