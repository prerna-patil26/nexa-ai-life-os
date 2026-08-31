from typing import List, Dict, Any, Optional
import numpy as np

class VectorStore:
    """Simple vector store using numpy (no FAISS dependency)"""
    
    def __init__(self, dimension: int = 384):
        self.dimension = dimension
        self.vectors = []  # List of embeddings
        self.metadata = []  # List of metadata (text, source, etc.)
    
    def add(self, embedding: List[float], metadata: Dict[str, Any]):
        """Add a vector to the store"""
        self.vectors.append(embedding)
        self.metadata.append(metadata)
    
    def search(self, query_embedding: List[float], top_k: int = 5) -> List[Dict[str, Any]]:
        """Search for similar vectors using cosine similarity"""
        if not self.vectors:
            return []
        
        query = np.array(query_embedding)
        scores = []
        for i, vec in enumerate(self.vectors):
            vec_arr = np.array(vec)
            dot = np.dot(query, vec_arr)
            norm_a = np.linalg.norm(query)
            norm_b = np.linalg.norm(vec_arr)
            if norm_a > 0 and norm_b > 0:
                score = dot / (norm_a * norm_b)
            else:
                score = 0
            scores.append(score)
        
        top_indices = np.argsort(scores)[-top_k:][::-1]
        
        results = []
        for idx in top_indices:
            results.append({
                "metadata": self.metadata[idx],
                "score": float(scores[idx])
            })
        return results
    
    def get_all(self) -> List[Dict[str, Any]]:
        """Get all stored vectors with metadata"""
        results = []
        for i, metadata in enumerate(self.metadata):
            results.append({"metadata": metadata})
        return results
