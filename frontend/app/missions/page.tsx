'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Plus, Target, CheckCircle2, Clock, AlertCircle, 
  MoreVertical, Play, Pause, Trash2, Sparkles, Loader2
} from 'lucide-react';
import { missionsApi } from '@/lib/api';

interface Task {
  id: number;
  title: string;
  status: string;
  agent_type?: string;
  tool_name?: string;
  created_at: string;
}

interface Mission {
  id: number;
  title: string;
  description?: string;
  goal: string;
  status: string;
  progress: number;
  created_at: string;
  tasks?: Task[];
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMission, setNewMission] = useState({ title: '', goal: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [newTask, setNewTask] = useState('');
  const [showTasks, setShowTasks] = useState<number | null>(null);

  // Load missions on mount
  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await missionsApi.getMissions();
      // Load tasks for each mission
      const missionsWithTasks = await Promise.all(
        data.map(async (mission: Mission) => {
          try {
            const tasks = await missionsApi.getTasks(mission.id);
            return { ...mission, tasks };
          } catch {
            return { ...mission, tasks: [] };
          }
        })
      );
      setMissions(missionsWithTasks);
    } catch (err) {
      setError('Failed to load missions. Make sure the backend is running.');
      console.error('Error loading missions:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMission = async () => {
    if (!newMission.title || !newMission.goal) return;
    setCreating(true);
    try {
      const created = await missionsApi.createMission({
        title: newMission.title,
        goal: newMission.goal,
        description: newMission.description
      });
      setMissions([...missions, { ...created, tasks: [] }]);
      setNewMission({ title: '', goal: '', description: '' });
      setShowCreateModal(false);
    } catch (err) {
      setError('Failed to create mission.');
      console.error('Error creating mission:', err);
    } finally {
      setCreating(false);
    }
  };

  const addTask = async (missionId: number) => {
    if (!newTask.trim()) return;
    try {
      const task = await missionsApi.createTask(missionId, {
        title: newTask,
        agent_type: 'general',
        tool_name: 'none'
      });
      
      // Update local state
      setMissions(missions.map(m => {
        if (m.id === missionId) {
          return {
            ...m,
            tasks: [...(m.tasks || []), task]
          };
        }
        return m;
      }));
      setNewTask('');
    } catch (err) {
      setError('Failed to add task.');
      console.error('Error adding task:', err);
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <span className="ml-3 text-gray-400">Loading missions...</span>
          </div>
        ) : missions.length === 0 ? (
          <div className="text-center py-20">
            <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Missions Yet</h3>
            <p className="text-gray-400 mb-4">Create your first mission to get started.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Create Mission
            </button>
          </div>
        ) : (
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
                    {mission.description && (
                      <p className="text-xs text-gray-500 mt-1">{mission.description}</p>
                    )}
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

                {/* Tasks Section */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowTasks(showTasks === mission.id ? null : mission.id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-3"
                  >
                    <Sparkles className="w-4 h-4" />
                    {showTasks === mission.id ? 'Hide Tasks' : 'Show Tasks'} ({mission.tasks?.length || 0})
                  </button>

                  {showTasks === mission.id && (
                    <div className="space-y-2">
                      {mission.tasks?.map((task) => (
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
                      
                      {/* Add Task Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={showTasks === mission.id ? newTask : ''}
                          onChange={(e) => setNewTask(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') addTask(mission.id);
                          }}
                          placeholder="Add new task..."
                          className="flex-1 bg-gray-800 rounded-lg p-2 text-sm text-white border border-gray-700 focus:border-purple-500 outline-none"
                        />
                        <button
                          onClick={() => addTask(mission.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-3 py-2 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
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
        )}

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
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Description (Optional)</label>
                  <input
                    type="text"
                    value={newMission.description}
                    onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
                    placeholder="Additional details..."
                    className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={createMission}
                    disabled={creating}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create Mission'}
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