'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Shopping() {
  const [requirements, setRequirements] = useState('');
  const [comparison, setComparison] = useState<any>(null);

  const compareProducts = () => {
    // Mock comparison for now
    setComparison({
      products: [
        { name: 'Product A', price: 799, rating: 4.5, features: ['Feature 1', 'Feature 2'] },
        { name: 'Product B', price: 999, rating: 4.8, features: ['Feature 1', 'Feature 2', 'Feature 3'] },
        { name: 'Product C', price: 599, rating: 4.2, features: ['Feature 1'] },
      ],
      recommendation: 'Product B offers the best value for your requirements.'
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Assistant</h1>
        <p className="text-gray-400 mb-8">Compare products based on your requirements.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Your Requirements</h3>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe what you're looking for..."
              className="w-full bg-gray-800 rounded-lg p-3 text-white h-32"
            />
            <button
              onClick={compareProducts}
              disabled={!requirements}
              className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              Compare Products
            </button>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Comparison Results</h3>
            {comparison ? (
              <div className="space-y-4">
                {comparison.products.map((p: any, i: number) => (
                  <div key={i} className="border border-gray-700 rounded-lg p-3">
                    <div className="flex justify-between">
                      <h4 className="font-semibold">{p.name}</h4>
                      <span className="text-purple-400">${p.price}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      <span>Rating: {p.rating}/5</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.features.map((f: string, j: number) => (
                        <span key={j} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="bg-green-900 text-green-300 rounded-lg p-3 text-sm">
                  {comparison.recommendation}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Enter requirements and click Compare to see results.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}