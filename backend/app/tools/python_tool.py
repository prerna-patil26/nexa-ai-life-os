from typing import Dict, Any
import ast
import sys
import io
from contextlib import redirect_stdout
from app.tools.base import BaseTool

class PythonTool(BaseTool):
    """Execute Python code in a sandboxed environment"""
    
    def __init__(self):
        super().__init__(
            name="python_executor",
            description="Execute Python code safely"
        )
    
    def execute(self, code: str, **kwargs) -> Dict[str, Any]:
        # Security check - block dangerous operations
        blocked = ['__import__', 'open(', 'eval(', 'exec(', 'system', 'subprocess']
        for block in blocked:
            if block in code:
                return {"error": f"Blocked dangerous operation: {block}"}
        
        # Execute in sandbox
        output = io.StringIO()
        try:
            with redirect_stdout(output):
                exec(code, {"__builtins__": {}}, {})
            return {"output": output.getvalue()}
        except Exception as e:
            return {"error": str(e), "partial_output": output.getvalue()}
