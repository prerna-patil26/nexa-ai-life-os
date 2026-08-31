'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Career() {
  const [jdText, setJdText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeJD = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/career/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jd_text: jdText,
          user_profile: { skills: ['python', 'fastapi', 'docker'] }
        })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Failed to analyze JD:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Career Intelligence</h1>
        <p className="text-gray-400 mb-8">Paste a job description to analyze skill gaps.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Job Description</h3>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full bg-gray-800 rounded-lg p-3 text-white h-64"
            />
            <button
              onClick={analyzeJD}
              disabled={!jdText || loading}
              className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              {loading ? 'Analyzing...' : 'Analyze JD'}
            </button>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Analysis Results</h3>
            {analysis ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Match Score</h4>
                  <p className="text-2xl font-bold text-purple-500">{analysis.match_score}%</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Required Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {analysis.jd_skills.map((skill: string) => (
                      <span key={skill} className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Missing Skills</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {analysis.missing_skills.map((skill: string) => (
                      <span key={skill} className="px-2 py-1 bg-red-900 text-red-300 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Recommendations</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {analysis.recommendations.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Paste a JD and click Analyze to see results.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}