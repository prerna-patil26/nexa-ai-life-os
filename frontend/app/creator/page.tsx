'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Creator() {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeContent = () => {
    // Mock analysis for now
    setAnalysis({
      hooks: ['Strong opening hook detected'],
      pacing: 'Good pacing with clear structure',
      engagement_score: 78,
      suggestions: [
        'Add more visual elements',
        'Include a call-to-action',
        'Shorten intro for better retention'
      ]
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Creator Studio</h1>
        <p className="text-gray-400 mb-8">Analyze your content for better engagement.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Content Input</h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content, script, or comments here..."
              className="w-full bg-gray-800 rounded-lg p-3 text-white h-64"
            />
            <button
              onClick={analyzeContent}
              disabled={!content}
              className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              Analyze Content
            </button>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Content Insights</h3>
            {analysis ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Engagement Score</h4>
                  <p className="text-2xl font-bold text-purple-500">{analysis.engagement_score}/100</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Hooks</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {analysis.hooks.map((hook: string, i: number) => (
                      <li key={i}>{hook}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Suggestions</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {analysis.suggestions.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Paste content and click Analyze to see insights.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}