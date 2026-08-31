'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Plane, Loader2, MapPin, Calendar, 
  Wallet, Clock, Star, CheckCircle2, 
  AlertCircle, Compass, Bed, Utensils
} from 'lucide-react';

export default function Travel() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('3');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const planTrip = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/travel/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destination,
          days: parseInt(days),
          budget: budget ? parseFloat(budget) : null,
          preferences: preferences
        })
      });
      
      if (!response.ok) throw new Error('Failed to plan trip');
      
      const data = await response.json();
      setItinerary(data);
    } catch (err) {
      setError('Failed to plan trip. Make sure backend is running.');
      console.error('Error planning trip:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTravelMission = async () => {
    if (!itinerary) return;
    try {
      const response = await fetch('http://localhost:8000/missions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Trip to ${itinerary.destination}`,
          goal: `Plan and execute ${itinerary.days}-day trip to ${itinerary.destination}`
        })
      });
      
      if (response.ok) {
        alert('Travel mission created! Check the Mission Board.');
      }
    } catch (err) {
      console.error('Error creating mission:', err);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'stay': return <Bed className="w-4 h-4 text-blue-400" />;
      case 'food': return <Utensils className="w-4 h-4 text-orange-400" />;
      case 'activity': return <Compass className="w-4 h-4 text-purple-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Travel Planner</h1>
          <p className="text-gray-400 mt-1">
            Plan your perfect trip with AI-generated itineraries, budget estimates, and recommendations.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Trip Input */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-purple-400" />
              Trip Details
            </h3>

            <div className="space-y-4">
              {/* Destination */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Goa, Manali, Jaipur..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>

              {/* Days */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Number of Days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  min="1"
                  max="30"
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
                  placeholder="e.g., 15000"
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none"
                />
              </div>

              {/* Preferences */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Preferences (optional)</label>
                <textarea
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g., adventure, foodie, budget-friendly, luxury..."
                  className="w-full bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-purple-500 outline-none h-24 resize-none"
                />
              </div>

              <button
                onClick={planTrip}
                disabled={!destination.trim() || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Planning...
                  </>
                ) : (
                  <>
                    <Compass className="w-5 h-5" />
                    Plan My Trip
                  </>
                )}
              </button>
            </div>

            {itinerary && (
              <div className="mt-6 border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
                <button
                  onClick={createTravelMission}
                  className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg p-2 text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Create Travel Mission
                </button>
              </div>
            )}
          </div>

          {/* Right: Itinerary */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              Your Itinerary
            </h3>

            {!itinerary && !loading ? (
              <div className="text-center py-16">
                <Plane className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Enter destination and click "Plan My Trip" to see your itinerary.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                <p className="text-gray-400 mt-4">Planning your trip...</p>
              </div>
            ) : itinerary ? (
              <div className="space-y-6">
                {/* Trip Summary */}
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-white">{itinerary.destination}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">{itinerary.days} days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wallet className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">₹{itinerary.estimated_budget.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Daily Itinerary */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-3">Daily Plan</h4>
                  <div className="space-y-4">
                    {itinerary.days_plan.map((day: any, i: number) => (
                      <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-white mb-3">
                          Day {day.day} - {day.title}
                        </h5>
                        <div className="space-y-2">
                          {day.activities.map((activity: any, j: number) => (
                            <div key={j} className="flex items-start gap-3">
                              {getActivityIcon(activity.type)}
                              <div className="flex-1">
                                <p className="text-sm text-gray-300">{activity.name}</p>
                                {activity.duration && (
                                  <p className="text-xs text-gray-500">
                                    <Clock className="w-3 h-3 inline mr-1" />
                                    {activity.duration} hours
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                {itinerary.tips && itinerary.tips.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      Travel Tips
                    </h4>
                    <ul className="space-y-2">
                      {itinerary.tips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                          {tip}
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