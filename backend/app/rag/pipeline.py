from typing import List, Dict, Any, Optional
from app.rag.chunker import Chunker
from app.rag.embeddings import Embeddings
from app.rag.vector_store import VectorStore

class RAGPipeline:
    """Complete RAG pipeline: chunk -> embed -> store -> retrieve"""
    
    def __init__(self):
        self.chunker = Chunker()
        self.embeddings = Embeddings()
        self.vector_store = VectorStore()
    
    def ingest(self, text: str, source: str = "") -> int:
        """Ingest text into the vector store"""
        chunks = self.chunker.chunk_text(text)
        
        for i, chunk in enumerate(chunks):
            embedding = self.embeddings.embed_text(chunk)
            self.vector_store.add(embedding, {
                "text": chunk,
                "source": source,
                "chunk_id": i
            })
        
        return len(chunks)
    
    def query(self, question: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Query the vector store"""
        query_embedding = self.embeddings.embed_text(question)
        results = self.vector_store.search(query_embedding, top_k=top_k)
        return results
    
    def retrieve_context(self, question: str, top_k: int = 3) -> str:
        """Retrieve context for LLM prompt"""
        results = self.query(question, top_k=top_k)
        context_parts = []
        for result in results:
            context_parts.append(result["metadata"]["text"])
        return "\n\n".join(context_parts)
