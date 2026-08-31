from typing import Dict, Any, List, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class AgentMetrics:
    """Metrics for a single agent run"""
    agent_name: str
    task_id: int
    success: bool
    latency_ms: float
    retries: int = 0
    error: Optional[str] = None
    timestamp: datetime = None
    
    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now()

class MetricsTracker:
    """Track and analyze agent performance metrics"""
    
    def __init__(self):
        self.runs: List[AgentMetrics] = []
    
    def record_run(self, metrics: AgentMetrics):
        """Record a single agent run"""
        self.runs.append(metrics)
    
    def get_success_rate(self, agent_name: Optional[str] = None) -> float:
        """Calculate success rate for an agent or all agents"""
        runs = self._filter_runs(agent_name)
        if not runs:
            return 0.0
        successful = sum(1 for r in runs if r.success)
        return successful / len(runs)
    
    def get_avg_latency(self, agent_name: Optional[str] = None) -> float:
        """Calculate average latency"""
        runs = self._filter_runs(agent_name)
        if not runs:
            return 0.0
        total_latency = sum(r.latency_ms for r in runs)
        return total_latency / len(runs)
    
    def get_total_retries(self, agent_name: Optional[str] = None) -> int:
        """Calculate total retries"""
        runs = self._filter_runs(agent_name)
        return sum(r.retries for r in runs)
    
    def get_error_rate(self, agent_name: Optional[str] = None) -> float:
        """Calculate error rate"""
        runs = self._filter_runs(agent_name)
        if not runs:
            return 0.0
        failed = sum(1 for r in runs if not r.success)
        return failed / len(runs)
    
    def get_summary(self, agent_name: Optional[str] = None) -> Dict[str, Any]:
        """Get complete metrics summary"""
        runs = self._filter_runs(agent_name)
        if not runs:
            return {
                "agent": agent_name or "all",
                "total_runs": 0,
                "success_rate": 0.0,
                "avg_latency_ms": 0.0,
                "total_retries": 0,
                "error_rate": 0.0
            }
        
        return {
            "agent": agent_name or "all",
            "total_runs": len(runs),
            "success_rate": self.get_success_rate(agent_name),
            "avg_latency_ms": self.get_avg_latency(agent_name),
            "total_retries": self.get_total_retries(agent_name),
            "error_rate": self.get_error_rate(agent_name)
        }
    
    def _filter_runs(self, agent_name: Optional[str] = None) -> List[AgentMetrics]:
        """Filter runs by agent name"""
        if agent_name:
            return [r for r in self.runs if r.agent_name == agent_name]
        return self.runs

# Singleton
metrics_tracker = MetricsTracker()
