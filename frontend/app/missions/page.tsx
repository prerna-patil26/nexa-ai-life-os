'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Plus, Target, CheckCircle2, Clock, AlertCircle, 
  MoreVertical, Play, Pause, Trash2, Sparkles
} from 'lucide-react';

export default function Missions() {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: 'AI Engineer Interview Prep',
      goal: 'Prepare for AI Engineer interviews at top tech companies',
      status: 'active',
      progress: 75,
      tasks: [
        { id: 1, title: 'Review ML fundamentals', status: 'completed' },
        { id: 2, title: 'Practice LeetCode problems', status: 'completed' },
        { id: 3, title: 'Prepare system design', status: 'in_progress' },
        { id: 4, title: 'Mock interview', status: 'pending' },
      ]
    },
    {
      id: 2,
      title: 'Build RAG Chatbot',
      goal: 'Create a RAG-based chatbot for document Q&A',
      status: 'active',
      progress: 40,
      tasks: [
        { id: 1, title: 'Setup document parser', status: 'completed' },
        { id: 2, title: 'Implement embeddings', status: 'in_progress' },
        { id: 3, title: 'Build FAISS index', status: 'pending' },
        { id: 4, title: 'Create API endpoint', status: 'pending' },
      ]
    },
    {
      id: 3,
      title: 'Career Portfolio',
      goal: 'Build a professional portfolio website',
      status: 'paused',
      progress: 20,
      tasks: [
        { id: 1, title: 'Design layout', status: 'completed' },
        { id: 2, title: 'Write content', status: 'pending' },
        { id: 3, title: 'Deploy website', status: 'pending' },
      ]
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMission, setNewMission] = useState({ title: '', goal: '' });

  const createMission = () => {
    if (newMission.title && newMission.goal) {
      const newMissionObj = {
        id: Date.now(),
        title: newMission.title,
        goal: newMission.goal,
        status: 'active',
        progress: 0,
        tasks: []
      };
      setMissions([...missions, newMissionObj]);
      setNewMission({ title: '', goal: '' });
      setShowCreateModal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'pending': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Mission Board</h1>
            <p className="text-gray-400 mt-1">
              Plan big goals. Break them into tasks. AI executes and tracks progress.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Mission
          </button>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <div key={mission.id} className="nexa-card p-6">
              {/* Mission Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white text-lg">{mission.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{mission.goal}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getMissionStatusColor(mission.status)}`}>
                    {mission.status}
                  </span>
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{mission.progress}%</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2 mb-4">
                {mission.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : task.status === 'in_progress' ? (
                      <Clock className="w-4 h-4 text-blue-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-sm flex-1 ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>
                      {task.title}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg p-2 text-sm transition-colors">
                  <Play className="w-4 h-4" />
                  {mission.status === 'paused' ? 'Resume' : 'Continue'}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg p-2 text-sm transition-colors">
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg p-2 text-sm transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Mission Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">Create New Mission</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Mission Title</label>
                  <input
                    type="text"
                    value={newMission.title}
                    onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
                    placeholder="e.g., Prepare for AI Engineer Interview"
                    className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Mission Goal</label>
                  <textarea
                    value={newMission.goal}
                    onChange={(e) => setNewMission({ ...newMission, goal: e.target.value })}
                    placeholder="Describe what you want to achieve..."
                    className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none h-24"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={createMission}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium"
                  >
                    Create Mission
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg p-3 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}