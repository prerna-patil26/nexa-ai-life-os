'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Eye, Loader2, Upload, Image as ImageIcon, 
  FileText, Scan, Type, AlertCircle, Sparkles
} from 'lucide-react';

export default function VisionLab() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
      setError('');
    }
  };

  const analyzeImage = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError('');
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', imageFile);

      // Upload and analyze
      const response = await fetch('http://localhost:8000/vision/analyze', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to analyze image');
      
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze image. Make sure backend is running.');
      console.error('Error analyzing image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Vision Lab</h1>
          <p className="text-gray-400 mt-1">
            Upload images or screenshots for AI analysis. Extract text, detect patterns, and get insights.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              Upload Image
            </h3>
            
            {/* Upload Area */}
            <div 
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {image ? (
                <div className="relative">
                  <img src={image} alt="Uploaded" className="max-h-64 mx-auto rounded-lg" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setImageFile(null);
                      setAnalysis(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Click to upload or drag & drop</p>
                  <p className="text-gray-600 text-sm mt-1">PNG, JPG, GIF, WEBP up to 10MB</p>
                </div>
              )}
            </div>

            <button
              onClick={analyzeImage}
              disabled={!imageFile || loading}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze Image
                </>
              )}
            </button>
          </div>

          {/* Right: Analysis Results */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-400" />
              Analysis Results
            </h3>

            {!analysis && !loading ? (
              <div className="text-center py-16">
                <Scan className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Upload an image and click "Analyze Image" to see results.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">Analyzing image...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Dimensions */}
                {analysis.dimensions && (
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Image Details
                    </h4>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Width</p>
                        <p className="text-lg font-bold text-white">{analysis.dimensions.width}px</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Height</p>
                        <p className="text-lg font-bold text-white">{analysis.dimensions.height}px</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Extracted Text */}
                {analysis.text && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Extracted Text (OCR)
                    </h4>
                    <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-300 max-h-48 overflow-y-auto">
                      {analysis.text}
                    </div>
                  </div>
                )}

                {/* Edge Density */}
                {analysis.edge_density !== undefined && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Scan className="w-4 h-4" />
                      Edge Density
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(analysis.edge_density * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-white font-medium">
                        {(analysis.edge_density * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Color Mean */}
                {analysis.color_mean && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Color Analysis
                    </h4>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-gray-800 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">Hue</p>
                        <p className="text-white font-bold">{Math.round(analysis.color_mean[0])}</p>
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">Saturation</p>
                        <p className="text-white font-bold">{Math.round(analysis.color_mean[1])}</p>
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-500">Value</p>
                        <p className="text-white font-bold">{Math.round(analysis.color_mean[2])}</p>
                      </div>
                    </div>
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