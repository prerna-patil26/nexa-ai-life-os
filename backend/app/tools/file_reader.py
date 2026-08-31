from typing import Dict, Any
import os
from app.tools.base import BaseTool

class FileReaderTool(BaseTool):
    """Read various file types (txt, pdf, docx, etc.)"""
    
    def __init__(self):
        super().__init__(
            name="file_reader",
            description="Read text from files including PDF, DOCX, TXT"
        )
    
    def execute(self, file_path: str, **kwargs) -> Dict[str, Any]:
        if not os.path.exists(file_path):
            return {"error": f"File not found: {file_path}"}
        
        file_ext = os.path.splitext(file_path)[1].lower()
        content = ""
        
        try:
            if file_ext == '.txt' or file_ext == '.md':
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            elif file_ext == '.pdf':
                # PDF reading (simplified - use PyPDF2 in production)
                content = self._read_pdf(file_path)
            elif file_ext == '.docx':
                # DOCX reading (simplified - use python-docx in production)
                content = self._read_docx(file_path)
            else:
                return {"error": f"Unsupported file type: {file_ext}"}
            
            return {"content": content, "filename": os.path.basename(file_path)}
        except Exception as e:
            return {"error": str(e)}
    
    def _read_pdf(self, file_path: str) -> str:
        # Simplified - use PyPDF2 for real implementation
        import subprocess
        result = subprocess.run(['pdftotext', file_path, '-'], capture_output=True, text=True)
        return result.stdout
    
    def _read_docx(self, file_path: str) -> str:
        # Simplified - use python-docx for real implementation
        from docx import Document
        doc = Document(file_path)
        return '\n'.join([p.text for p in doc.paragraphs])
