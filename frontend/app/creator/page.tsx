'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Sparkles, Loader2, Upload, Video, 
  MessageSquare, TrendingUp, Hash, Users, 
  Eye, ThumbsUp, Share2, AlertCircle
} from 'lucide-react';

export default function Creator() {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const analyzeContent = async () => {
    if (!content.trim() && !videoFile) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/creator/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content,
          type: videoFile ? 'video' : 'text'
        })
      });
      
      if (!response.ok) throw new Error('Failed to analyze content');
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze content. Make sure backend is running.');
      console.error('Error analyzing content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setContent(`Video: ${file.name}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Creator Studio</h1>
          <p className="text-gray-400 mt-1">
            Analyze your content, understand your audience, and get AI-powered suggestions.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Content Input */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              Content Input
            </h3>

            <div className="space-y-4">
              {/* Text Content */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Paste Content / Script / Caption</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your video script, caption, or content here..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none h-40 resize-none"
                />
              </div>

              {/* Video Upload */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Or Upload Video</label>
                <label className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer border border-gray-700">
                  <Video className="w-5 h-5 text-purple-400" />
                  <span>{videoFile ? videoFile.name : 'Upload video for analysis'}</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={analyzeContent}
                disabled={!content.trim() || loading}
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
                    Analyze Content
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Analysis Results */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Content Insights
            </h3>

            {!analysis && !loading ? (
              <div className="text-center py-16">
                <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Add your content and click "Analyze Content" to see insights.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">Analyzing your content...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Engagement Score */}
                {analysis.engagement_score !== undefined && (
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a2e" strokeWidth="8" />
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="none" stroke="url(#scoreGradient)" 
                          strokeWidth="8" 
                          strokeLinecap="round"
                          strokeDasharray={`${analysis.engagement_score * 2.51} 251.2`}
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
                          <p className="text-3xl font-bold text-white">{analysis.engagement_score}</p>
                          <p className="text-xs text-gray-400">/100</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Engagement Score</p>
                  </div>
                )}

                {/* Hooks */}
                {analysis.hooks && analysis.hooks.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Strong Hooks
                    </h4>
                    <ul className="space-y-2">
                      {analysis.hooks.map((hook: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                          {hook}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pacing */}
                {analysis.pacing && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Pacing Analysis
                    </h4>
                    <p className="text-sm text-gray-300">{analysis.pacing}</p>
                  </div>
                )}

                {/* Audience Insights */}
                {analysis.audience_insights && analysis.audience_insights.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Audience Insights
                    </h4>
                    <ul className="space-y-2">
                      {analysis.audience_insights.map((insight: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions && analysis.suggestions.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Improvement Suggestions
                    </h4>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                          {s}
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