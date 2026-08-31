from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, List
import os
import tempfile
from app.db.init_db import get_db
from app.db.models import Document
from app.rag.pipeline import RAGPipeline

router = APIRouter(prefix="/documents", tags=["documents"])

# Initialize RAG pipeline (singleton)
rag_pipeline = RAGPipeline()

@router.get("/")
def list_documents(db: Session = Depends(get_db)):
    """List all documents"""
    return db.query(Document).all()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload and index a document"""
    try:
        # Read file content
        contents = await file.read()
        
        # Try to decode as text
        try:
            text = contents.decode('utf-8')
        except:
            # If binary, extract text based on extension
            ext = os.path.splitext(file.filename)[1].lower()
            if ext == '.pdf':
                # Simple PDF text extraction (in production use PyPDF2)
                text = f"PDF document: {file.filename}\nContent could not be fully extracted."
            elif ext == '.docx':
                text = f"DOCX document: {file.filename}\nContent could not be fully extracted."
            else:
                text = f"Binary file: {file.filename}"
        
        # Save to database
        doc = Document(
            filename=file.filename,
            file_type=os.path.splitext(file.filename)[1].lower(),
            content=text
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)
        
        # Index in RAG pipeline
        rag_pipeline.ingest(text, source=file.filename)
        
        return doc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask")
def ask_document(question: Dict[str, Any]):
    """Ask a question about indexed documents"""
    try:
        q = question.get("question", "")
        if not q:
            raise HTTPException(status_code=400, detail="Question required")
        
        # Retrieve context from RAG
        context = rag_pipeline.retrieve_context(q, top_k=3)
        
        # Simple answer generation (in production use LLM)
        answer = f"Based on your documents, here is the relevant information:\n\n{context}"
        
        return {"answer": answer, "context": context}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{doc_id}")
def delete_document(doc_id: int, db: Session = Depends(get_db)):
    """Delete a document"""
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    db.delete(doc)
    db.commit()
    return {"message": "Document deleted"}