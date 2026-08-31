'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { missionsApi } from '@/lib/api';

export default function Missions() {
  const [missions, setMissions] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const data = await missionsApi.getMissions();
      setMissions(data);
    } catch (error) {
      console.error('Failed to load missions:', error);
    }
  };

  const createMission = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await missionsApi.createMission({ title, goal });
      setTitle('');
      setGoal('');
      await loadMissions();
    } catch (error) {
      console.error('Failed to create mission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Mission Board</h1>
        
        {/* Create Mission Form */}
        <div className="nexa-card p-6 mb-8">
          <h3 className="font-semibold mb-4">Create New Mission</h3>
          <form onSubmit={createMission} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Mission Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mission Goal (e.g., Prepare for AI interview)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              {loading ? 'Creating...' : 'Create Mission'}
            </button>
          </form>
        </div>

        {/* Missions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission) => (
            <div key={mission.id} className="nexa-card p-6">
              <h3 className="font-semibold text-lg">{mission.title}</h3>
              <p className="text-gray-400 mt-2">{mission.goal}</p>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span>Status</span>
                  <span className="text-purple-400">{mission.status}</span>
                </div>
                <div className="mt-2 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}