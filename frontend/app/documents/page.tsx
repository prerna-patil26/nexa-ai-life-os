'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  FileText, Loader2, Upload, Search, 
  MessageSquare, X, CheckCircle2, File, Trash2
} from 'lucide-react';

export default function Documents() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  // Load documents on mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await fetch('http://localhost:8000/documents/');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
    }
  };

  const uploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:8000/documents/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setDocuments([...documents, data]);
      alert('Document uploaded successfully!');
    } catch (err) {
      setError('Failed to upload document.');
      console.error('Error uploading:', err);
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/documents/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question })
      });
      
      if (!response.ok) throw new Error('Failed to get answer');
      
      const data = await response.json();
      setAnswer(data.answer);
      setShowAnswer(true);
    } catch (err) {
      setError('Failed to get answer. Make sure backend is running.');
      console.error('Error asking question:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/documents/${docId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setDocuments(documents.filter(d => d.id !== docId));
      }
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Documents & RAG</h1>
          <p className="text-gray-400 mt-1">
            Upload documents, search through them, and get AI-powered answers with source evidence.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Documents List */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Your Documents ({documents.length})
            </h3>

            {/* Upload Button */}
            <div className="mb-6">
              <label className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg p-4 cursor-pointer transition-colors border border-purple-500/30">
                <Upload className="w-5 h-5" />
                <span>{uploading ? 'Uploading...' : 'Upload Document'}</span>
                <input
                  type="file"
                  accept=".pdf,.txt,.docx,.md"
                  onChange={uploadDocument}
                  className="hidden"
                />
              </label>
            </div>

            {/* Documents List */}
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <File className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No documents uploaded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                    <FileText className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{doc.filename}</p>
                      <p className="text-xs text-gray-500">{doc.file_type}</p>
                    </div>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Ask Questions */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              Ask Your Documents
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Your Question</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about your uploaded documents..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none h-32 resize-none"
                />
              </div>

              <button
                onClick={askQuestion}
                disabled={!question.trim() || loading || documents.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Get Answer
                  </>
                )}
              </button>

              {/* Answer Display */}
              {showAnswer && answer && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    AI Answer
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{answer}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}