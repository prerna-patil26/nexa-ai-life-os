'use client';
import Sidebar from '@/components/Sidebar';

export default function Agents() {
  const agents = [
    { name: 'Supervisor', role: 'Main router', status: 'Active' },
    { name: 'Planner', role: 'Goal breakdown', status: 'Active' },
    { name: 'Researcher', role: 'Information gathering', status: 'Active' },
    { name: 'Vision', role: 'Image/video analysis', status: 'Active' },
    { name: 'Data', role: 'CSV/Excel analysis', status: 'Active' },
    { name: 'Career', role: 'JD & skill gap', status: 'Active' },
    { name: 'Learning', role: 'Adaptive study', status: 'Active' },
    { name: 'Creator', role: 'Content analysis', status: 'Active' },
    { name: 'Developer', role: 'Code/test/debug', status: 'Active' },
    { name: 'Critic', role: 'Quality checking', status: 'Active' },
    { name: 'Verifier', role: 'Goal completion', status: 'Active' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">AI Agents</h1>
        <p className="text-gray-400 mb-8">Specialist agents that work together to complete your missions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.name} className="nexa-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{agent.name}</h3>
                <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">
                  {agent.status}
                </span>
              </div>
              <p className="text-gray-400">{agent.role}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
