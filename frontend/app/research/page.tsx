'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Research() {
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const conductResearch = async () => {
    setLoading(true);
    // Mock research for now
    setTimeout(() => {
      setResults({
        summary: 'Based on available sources, here is a summary of findings related to your question.',
        sources: [
          { title: 'Source 1', url: 'https://example.com/1', relevance: 0.95 },
          { title: 'Source 2', url: 'https://example.com/2', relevance: 0.87 },
          { title: 'Source 3', url: 'https://example.com/3', relevance: 0.72 },
        ],
        key_findings: [
          'Finding 1: Key insight discovered',
          'Finding 2: Supporting evidence found',
          'Finding 3: Important context identified'
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Research Assistant</h1>
        <p className="text-gray-400 mb-8">Ask questions and get evidence-based answers.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Research Question</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your research question..."
              className="w-full bg-gray-800 rounded-lg p-3 text-white h-32"
            />
            <button
              onClick={conductResearch}
              disabled={!question || loading}
              className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              {loading ? 'Researching...' : 'Conduct Research'}
            </button>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Research Results</h3>
            {results ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Summary</h4>
                  <p className="mt-1 text-sm">{results.summary}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Key Findings</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {results.key_findings.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Sources</h4>
                  <div className="space-y-2 mt-1">
                    {results.sources.map((s: any, i: number) => (
                      <div key={i} className="text-sm">
                        <span className="text-purple-400">{s.title}</span>
                        <span className="text-gray-500"> - {Math.round(s.relevance * 100)}% relevant</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Ask a question and click Conduct Research to see results.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}