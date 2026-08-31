'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function VisionLab() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setLoading(true);
    // TODO: Connect to backend vision API
    // For now, show mock analysis
    setTimeout(() => {
      setAnalysis({
        text: 'Sample text extracted from image',
        dimensions: { width: 1920, height: 1080 },
        edge_density: 0.04
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Vision Lab</h1>
        <p className="text-gray-400 mb-8">Upload images or screenshots for AI analysis.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Upload Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-gray-800 rounded-lg p-3 text-white"
            />
            {image && (
              <div className="mt-4">
                <img src={image} alt="Uploaded" className="rounded-lg max-h-64" />
              </div>
            )}
            <button
              onClick={analyzeImage}
              disabled={!image || loading}
              className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold"
            >
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Analysis Results</h3>
            {analysis ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Extracted Text</h4>
                  <p className="mt-1">{analysis.text}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Dimensions</h4>
                  <p className="mt-1">{analysis.dimensions.width} x {analysis.dimensions.height}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400">Edge Density</h4>
                  <p className="mt-1">{analysis.edge_density.toFixed(4)}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Upload an image and click Analyze to see results.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
