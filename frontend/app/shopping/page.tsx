'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  ShoppingBag, Loader2, Upload, Search, 
  Star, TrendingUp, Tag, ExternalLink, 
  Camera, CheckCircle2, AlertCircle, DollarSign
} from 'lucide-react';

export default function Shopping() {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResults(null);
      setError('');
    }
  };

  const searchProduct = async () => {
    if (!productName.trim() && !productImageFile) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/shopping/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: productName,
          budget: budget ? parseFloat(budget) : null,
          has_image: !!productImageFile
        })
      });
      
      if (!response.ok) throw new Error('Failed to search products');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to search products. Make sure backend is running.');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'amazon': return 'bg-orange-900/30 text-orange-400 border-orange-500/30';
      case 'flipkart': return 'bg-blue-900/30 text-blue-400 border-blue-500/30';
      case 'myntra': return 'bg-pink-900/30 text-pink-400 border-pink-500/30';
      case 'ajio': return 'bg-purple-900/30 text-purple-400 border-purple-500/30';
      case 'croma': return 'bg-green-900/30 text-green-400 border-green-500/30';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Assistant</h1>
          <p className="text-gray-400 mt-1">
            Search products, upload images, and let AI find the best price & rating across platforms.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Search Input */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" />
              What are you looking for?
            </h3>

            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., iPhone 15, Laptop, Sneakers..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Budget (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Or Upload Product Image</label>
                <label className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer border border-gray-700">
                  {productImage ? (
                    <div className="relative">
                      <img src={productImage} alt="Product" className="max-h-32 rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setProductImage(null);
                          setProductImageFile(null);
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 text-purple-400" />
                      <span>Upload product image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={searchProduct}
                disabled={(!productName.trim() && !productImageFile) || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Search Products
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Price Comparison
            </h3>

            {!results && !loading ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Search a product or upload an image to see price comparison across platforms.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">Searching across platforms...</p>
              </div>
            ) : results ? (
              <div className="space-y-6">
                {/* Best Deal Highlight */}
                {results.best_deal && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Best Deal Found
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-white">{results.best_deal.platform}</p>
                        <p className="text-sm text-gray-300">₹{results.best_deal.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-white">{results.best_deal.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* All Platforms */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-3">Available Platforms</h4>
                  <div className="space-y-3">
                    {results.products.map((product: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs border ${getPlatformColor(product.platform)}`}>
                              {product.platform}
                            </span>
                            {product.is_best_deal && (
                              <span className="px-2 py-0.5 rounded-full text-xs bg-green-900 text-green-300">
                                Best Price
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-white">{product.rating}</span>
                          </div>
                          <a
                            href={product.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1"
                          >
                            View <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {results.recommendations && results.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                          {rec}
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