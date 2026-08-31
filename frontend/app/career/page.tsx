'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Briefcase, Loader2, Target, CheckCircle2, XCircle, 
  TrendingUp, Award, AlertTriangle, Sparkles
} from 'lucide-react';

export default function Career() {
  const [jdText, setJdText] = useState('');
  const [userSkills, setUserSkills] = useState('python, fastapi, docker, sql');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeJD = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const skillsArray = userSkills.split(',').map(s => s.trim()).filter(s => s);
      const response = await fetch('http://localhost:8000/career/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jd_text: jdText,
          user_profile: { skills: skillsArray }
        })
      });
      
      if (!response.ok) throw new Error('Failed to analyze JD');
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze job description. Make sure backend is running.');
      console.error('Error analyzing JD:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPrepMission = async () => {
    if (!analysis) return;
    try {
      const response = await fetch('http://localhost:8000/missions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Interview Prep - Skill Gap',
          goal: `Prepare for interview. Missing skills: ${analysis.missing_skills.join(', ')}`
        })
      });
      
      if (response.ok) {
        alert('Mission created! Check the Mission Board.');
      }
    } catch (err) {
      console.error('Error creating mission:', err);
    }
  };

  const getSkillColor = (skill: string) => {
    if (analysis?.missing_skills?.includes(skill)) {
      return 'bg-red-900/30 text-red-400 border-red-500/30';
    }
    return 'bg-green-900/30 text-green-400 border-green-500/30';
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Career Intelligence</h1>
          <p className="text-gray-400 mt-1">
            Paste a job description to analyze skill gaps and get interview prep recommendations.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Job Description Input */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              Job Description
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Paste JD Text</label>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none h-48 resize-none"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-2">Your Skills (comma separated)</label>
                <input
                  type="text"
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  placeholder="python, fastapi, docker, sql..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>

              <button
                onClick={analyzeJD}
                disabled={!jdText.trim() || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze JD
                  </>
                )}
              </button>
            </div>

            {analysis && (
              <div className="mt-6 border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
                <div className="flex gap-2">
                  <button
                    onClick={createPrepMission}
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg p-2 text-sm flex items-center justify-center gap-2"
                  >
                    <Target className="w-4 h-4" />
                    Create Prep Mission
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Analysis Results */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Analysis Results
            </h3>

            {!analysis && !loading ? (
              <div className="text-center py-16">
                <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Paste a job description and click "Analyze JD" to see skill gap analysis.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">Analyzing job description...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Match Score */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a2e" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" stroke="url(#scoreGradient)" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray={`${analysis.match_score * 2.51} 251.2`}
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <p className="text-3xl font-bold text-white">{analysis.match_score}%</p>
                        <p className="text-xs text-gray-400">Match</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Required Skills ({analysis.jd_skills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.jd_skills.map((skill: string) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-xs border ${getSkillColor(skill)}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {analysis.missing_skills.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Missing Skills ({analysis.missing_skills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missing_skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 rounded-full text-xs bg-red-900/30 text-red-400 border border-red-500/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {analysis.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                          {rec}
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