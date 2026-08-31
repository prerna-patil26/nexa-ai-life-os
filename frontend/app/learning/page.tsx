'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  GraduationCap, Loader2, BookOpen, Brain, 
  Target, CheckCircle2, AlertCircle, Sparkles,
  Clock, TrendingUp, Award
} from 'lucide-react';

export default function Learning() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('beginner');
  const [knowledgeGaps, setKnowledgeGaps] = useState('');
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePlan = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    try {
      const gaps = knowledgeGaps.split(',').map(s => s.trim()).filter(s => s);
      const response = await fetch('http://localhost:8000/learning/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic,
          level: level,
          knowledge_gaps: gaps
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate plan');
      
      const data = await response.json();
      setPlan(data);
    } catch (err) {
      setError('Failed to generate learning plan. Make sure backend is running.');
      console.error('Error generating plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMissionFromPlan = async () => {
    if (!plan) return;
    try {
      const response = await fetch('http://localhost:8000/missions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Learn ${plan.topic}`,
          goal: `Complete learning plan for ${plan.topic} (${plan.level} level)`
        })
      });
      
      if (response.ok) {
        alert('Learning mission created! Check the Mission Board.');
      }
    } catch (err) {
      console.error('Error creating mission:', err);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'bg-purple-900/30 text-purple-400 border-purple-500/30';
      case 'practice': return 'bg-blue-900/30 text-blue-400 border-blue-500/30';
      case 'project': return 'bg-green-900/30 text-green-400 border-green-500/30';
      case 'assessment': return 'bg-orange-900/30 text-orange-400 border-orange-500/30';
      case 'targeted': return 'bg-red-900/30 text-red-400 border-red-500/30';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Learning Hub</h1>
          <p className="text-gray-400 mt-1">
            Create personalized learning plans with AI. Track progress and master new skills.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Plan Generator */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              Create Learning Plan
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">What do you want to learn?</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Machine Learning, React, Python..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Your Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Knowledge Gaps (comma separated, optional)</label>
                <input
                  type="text"
                  value={knowledgeGaps}
                  onChange={(e) => setKnowledgeGaps(e.target.value)}
                  placeholder="e.g., transformers, RAG, FAISS"
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>

              <button
                onClick={generatePlan}
                disabled={!topic.trim() || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Generate Plan
                  </>
                )}
              </button>
            </div>

            {plan && (
              <div className="mt-6 border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
                <button
                  onClick={createMissionFromPlan}
                  className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg p-2 text-sm flex items-center justify-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  Create Learning Mission
                </button>
              </div>
            )}
          </div>

          {/* Right: Generated Plan */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Your Learning Plan
            </h3>

            {!plan && !loading ? (
              <div className="text-center py-16">
                <GraduationCap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Enter a topic and click "Generate Plan" to create your personalized learning path.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">Creating your personalized plan...</p>
              </div>
            ) : plan ? (
              <div className="space-y-6">
                {/* Plan Summary */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white">{plan.topic}</h4>
                  <p className="text-sm text-gray-400">Level: {plan.level}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Estimated: {plan.estimated_hours} hours</span>
                  </div>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-3">Your Learning Path</h4>
                  <div className="space-y-3">
                    {plan.plan.map((step: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-400">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{step.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs border ${getTypeColor(step.type)}`}>
                              {step.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {step.duration_minutes} min
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                {plan.recommended_resources && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      Recommended Resources
                    </h4>
                    <ul className="space-y-2">
                      {plan.recommended_resources.map((res: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}