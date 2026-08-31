'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Developer() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    // Mock code execution
    setTimeout(() => {
      setOutput('Code executed successfully!\nOutput: Hello, World!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Developer Workspace</h1>
        <p className="text-gray-400 mb-8">Write, test, and debug code with AI assistance.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Code Editor</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white h-64 font-mono text-sm"
            />
            <button
              onClick={runCode}
              disabled={!code || loading}
              className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              {loading ? 'Running...' : 'Run Code'}
            </button>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Output</h3>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 h-64 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-green-400">{output || 'Run your code to see output.'}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}