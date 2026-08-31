import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Good Morning! 👋</h1>
        <p className="text-gray-400 mb-8">One platform. Everything you do online. AI connects it all.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Plan Card */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Today's Plan</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Interview Preparation</span>
                <span className="text-purple-400">Career</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Python Practice</span>
                <span className="text-blue-400">Learning</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Project NEXA Review</span>
                <span className="text-green-400">Projects</span>
              </div>
            </div>
          </div>

          {/* AI Priority Score */}
          <div className="nexa-card p-6 text-center">
            <h3 className="font-semibold mb-4">AI Priority Score</h3>
            <div className="text-5xl font-bold text-purple-500">87</div>
            <p className="text-gray-400 mt-2">Great! You're on track.</p>
          </div>

          {/* Quick Actions */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-purple-600 hover:bg-purple-700 rounded-lg p-3 text-sm">Upload</button>
              <button className="bg-blue-600 hover:bg-blue-700 rounded-lg p-3 text-sm">OCR</button>
              <button className="bg-green-600 hover:bg-green-700 rounded-lg p-3 text-sm">Screenshot</button>
              <button className="bg-orange-600 hover:bg-orange-700 rounded-lg p-3 text-sm">Voice</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
