'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Documents() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const uploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock upload
      setDocuments([...documents, { name: file.name, type: file.type, size: file.size }]);
    }
  };

  const askQuestion = () => {
    // Mock RAG answer
    setAnswer(`Based on your documents, here is the answer to: "${question}"`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Documents & RAG</h1>
        <p className="text-gray-400 mb-8">Upload documents and ask questions about them.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Upload Documents</h3>
            <input
              type="file"
              multiple
              onChange={uploadDocument}
              className="w-full bg-gray-800 rounded-lg p-3 text-white"
            />
            <div className="mt-4 space-y-2">
              {documents.map((doc, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-800 rounded-lg p-3">
                  <span className="text-sm">{doc.name}</span>
                  <span className="text-xs text-gray-400">{(doc.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Ask Questions</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ask about your documents..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              />
              <button
                onClick={askQuestion}
                disabled={!question}
                className="bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
              >
                Ask
              </button>
              {answer && (
                <div className="bg-blue-900 text-blue-300 rounded-lg p-3 text-sm">
                  {answer}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}