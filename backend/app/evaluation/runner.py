from typing import Dict, Any, List, Optional
from app.evaluation.metrics import MetricsTracker, AgentMetrics

class EvaluationRunner:
    """Run benchmark tasks and evaluate agent performance"""
    
    def __init__(self):
        self.metrics_tracker = MetricsTracker()
        self.benchmarks = []
    
    def add_benchmark(self, name: str, task: Dict[str, Any], expected_output: Any):
        """Add a benchmark task"""
        self.benchmarks.append({
            "name": name,
            "task": task,
            "expected_output": expected_output
        })
    
    def run_benchmark(self, agent, benchmark: Dict[str, Any]) -> AgentMetrics:
        """Run a single benchmark task"""
        import time
        start = time.time()
        
        try:
            result = agent.process(benchmark["task"])
            success = result.get("status") == "completed"
            latency = (time.time() - start) * 1000
            
            metrics = AgentMetrics(
                agent_name=agent.name,
                task_id=0,
                success=success,
                latency_ms=latency
            )
        except Exception as e:
            latency = (time.time() - start) * 1000
            metrics = AgentMetrics(
                agent_name=agent.name,
                task_id=0,
                success=False,
                latency_ms=latency,
                error=str(e)
            )
        
        self.metrics_tracker.record_run(metrics)
        return metrics
    
    def run_all_benchmarks(self, agent) -> List[AgentMetrics]:
        """Run all benchmarks for an agent"""
        results = []
        for benchmark in self.benchmarks:
            results.append(self.run_benchmark(agent, benchmark))
        return results
    
    def get_report(self, agent_name: Optional[str] = None) -> Dict[str, Any]:
        """Get evaluation report"""
        return self.metrics_tracker.get_summary(agent_name)
