from typing import List
import numpy as np
import hashlib

class Embeddings:
    """Generate embeddings for text chunks using hashing"""
    
    def __init__(self, model_name: str = "hash-based", dimension: int = 384):
        self.model_name = model_name
        self.dimension = dimension
    
    def embed_text(self, text: str) -> List[float]:
        """Generate embedding using hashing"""
        vec = np.zeros(self.dimension)
        words = text.lower().split()
        for word in words:
            hash_val = int(hashlib.md5(word.encode()).hexdigest(), 16)
            idx = hash_val % self.dimension
            vec[idx] += 1
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = vec / norm
        return vec.tolist()
    
    def embed_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts"""
        return [self.embed_text(text) for text in texts]
