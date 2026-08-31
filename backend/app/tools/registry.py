from typing import Dict, Any, List
from app.tools.base import BaseTool
from app.tools.file_reader import FileReaderTool
from app.tools.python_tool import PythonTool
from app.tools.browser_tool import BrowserTool

class ToolRegistry:
    """Registry of all available tools for MCP (Model Context Protocol)"""
    
    def __init__(self):
        self.tools: Dict[str, BaseTool] = {}
        self._register_default_tools()
    
    def _register_default_tools(self):
        self.register_tool(FileReaderTool())
        self.register_tool(PythonTool())
        self.register_tool(BrowserTool())
    
    def register_tool(self, tool: BaseTool):
        self.tools[tool.name] = tool
    
    def get_tool(self, name: str) -> BaseTool:
        if name not in self.tools:
            raise ValueError(f"Tool not found: {name}")
        return self.tools[name]
    
    def list_tools(self) -> List[str]:
        return list(self.tools.keys())
    
    def execute_tool(self, name: str, **kwargs) -> Dict[str, Any]:
        tool = self.get_tool(name)
        return tool.execute(**kwargs)

# Singleton
tool_registry = ToolRegistry()
