from typing import Dict, Any, List, Optional, Tuple
import json

class KnowledgeGraph:
    """Store relationships between concepts, skills, projects, and topics"""
    
    def __init__(self):
        self.nodes = {}  # node_id -> node_data
        self.edges = []  # list of (source, target, relationship)
    
    def add_node(self, node_id: str, node_type: str, data: Dict[str, Any]):
        """Add a node to the graph"""
        self.nodes[node_id] = {
            "id": node_id,
            "type": node_type,
            "data": data
        }
    
    def add_edge(self, source: str, target: str, relationship: str):
        """Add an edge between nodes"""
        self.edges.append({
            "source": source,
            "target": target,
            "relationship": relationship
        })
    
    def get_related(self, node_id: str, relationship: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get nodes related to a given node"""
        related = []
        for edge in self.edges:
            if edge["source"] == node_id:
                if relationship is None or edge["relationship"] == relationship:
                    if edge["target"] in self.nodes:
                        related.append(self.nodes[edge["target"]])
            elif edge["target"] == node_id:
                if relationship is None or edge["relationship"] == relationship:
                    if edge["source"] in self.nodes:
                        related.append(self.nodes[edge["source"]])
        return related
    
    def find_path(self, start: str, end: str) -> List[str]:
        """Find a path between two nodes (BFS)"""
        if start not in self.nodes or end not in self.nodes:
            return []
        
        # Build adjacency list
        adj = {}
        for edge in self.edges:
            if edge["source"] not in adj:
                adj[edge["source"]] = []
            if edge["target"] not in adj:
                adj[edge["target"]] = []
            adj[edge["source"]].append(edge["target"])
            adj[edge["target"]].append(edge["source"])
        
        # BFS
        from collections import deque
        queue = deque([(start, [start])])
        visited = {start}
        
        while queue:
            node, path = queue.popleft()
            if node == end:
                return path
            for neighbor in adj.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return []
    
    def export(self) -> Dict[str, Any]:
        """Export graph as JSON"""
        return {
            "nodes": self.nodes,
            "edges": self.edges
        }
    
    def import_data(self, data: Dict[str, Any]):
        """Import graph from JSON"""
        self.nodes = data.get("nodes", {})
        self.edges = data.get("edges", [])
