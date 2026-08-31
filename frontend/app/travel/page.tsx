'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Travel() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [itinerary, setItinerary] = useState<any>(null);

  const planTrip = () => {
    // Mock itinerary for now
    setItinerary({
      destination: destination,
      days: [
        { day: 1, activities: ['Arrive and check-in', 'Explore local market', 'Dinner at popular restaurant'] },
        { day: 2, activities: ['Visit main attraction', 'Lunch at cafe', 'Evening walk'] },
        { day: 3, activities: ['Day trip to nearby location', 'Shopping', 'Farewell dinner'] },
      ],
      estimated_budget: budget,
      tips: ['Book accommodation early', 'Try local cuisine', 'Carry cash for small vendors']
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Travel Planner</h1>
        <p className="text-gray-400 mb-8">Plan your trip with AI-generated itineraries.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Trip Details</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Destination (e.g., Goa, Manali)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              />
              <input
                type="text"
                placeholder="Budget (e.g., 15000)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-gray-800 rounded-lg p-3 text-white"
              />
              <button
                onClick={planTrip}
                disabled={!destination || !budget}
                className="bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-white font-semibold w-full"
              >
                Plan My Trip
              </button>
            </div>
          </div>

          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Your Itinerary</h3>
            {itinerary ? (
              <div className="space-y-4">
                <h4 className="text-purple-400 font-semibold">{itinerary.destination}</h4>
                {itinerary.days.map((day: any, i: number) => (
                  <div key={i} className="border border-gray-700 rounded-lg p-3">
                    <h5 className="font-semibold text-sm">Day {day.day}</h5>
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      {day.activities.map((a: string, j: number) => (
                        <li key={j}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bg-green-900 text-green-300 rounded-lg p-3 text-sm">
                  <strong>Estimated Budget:</strong> ₹{itinerary.estimated_budget}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Enter destination and budget to see your itinerary.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}