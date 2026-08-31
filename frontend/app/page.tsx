'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Brain, Briefcase, GraduationCap, FolderKanban, Wallet, 
  Users, Plane, Calendar, FileText, Sparkles, 
  TrendingUp, Clock, Target, Zap, ChevronRight
} from 'lucide-react';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const categoryCards = [
    { icon: GraduationCap, label: 'Learning', tasks: 3, color: 'text-purple-400', bg: 'bg-purple-900/30', border: 'border-purple-500/30' },
    { icon: Briefcase, label: 'Career', tasks: 2, color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500/30' },
    { icon: FolderKanban, label: 'Projects', tasks: 2, color: 'text-green-400', bg: 'bg-green-900/30', border: 'border-green-500/30' },
    { icon: Wallet, label: 'Finance', tasks: 1, color: 'text-orange-400', bg: 'bg-orange-900/30', border: 'border-orange-500/30' },
    { icon: Users, label: 'Social', tasks: 3, color: 'text-pink-400', bg: 'bg-pink-900/30', border: 'border-pink-500/30' },
    { icon: Plane, label: 'Travel', tasks: 1, color: 'text-cyan-400', bg: 'bg-cyan-900/30', border: 'border-cyan-500/30' },
  ];

  const todayPlan = [
    { time: '09:00', task: 'Interview Preparation', category: 'Career', color: 'text-purple-400' },
    { time: '11:30', task: 'Python Practice', category: 'Learning', color: 'text-blue-400' },
    { time: '14:00', task: 'Project NEXA Review', category: 'Projects', color: 'text-green-400' },
    { time: '16:00', task: 'Apply to 2 Jobs', category: 'Career', color: 'text-purple-400' },
    { time: '18:00', task: 'Review Expenses', category: 'Finance', color: 'text-orange-400' },
    { time: '20:00', task: 'Watch React Course', category: 'Learning', color: 'text-blue-400' },
  ];

  const updates = [
    { source: 'LinkedIn', icon: '💼', title: '5 new AI Engineer jobs match your profile', time: '10m ago' },
    { source: 'YouTube', icon: '🎬', title: '3 new videos in your AI playlist', time: '2h ago' },
    { source: 'Gmail', icon: '📧', title: '2 important emails need your attention', time: '2h ago' },
    { source: 'Social', icon: '📱', title: 'You spent 32% less this month', time: '1d ago' },
  ];

  const quickActions = [
    { icon: Zap, label: 'New Task', color: 'bg-purple-600 hover:bg-purple-700' },
    { icon: Target, label: 'New Mission', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Brain, label: 'AI Tools', color: 'bg-green-600 hover:bg-green-700' },
    { icon: Sparkles, label: 'Copilot', color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  const ongoingProjects = [
    { name: 'NEXA AI Life OS', progress: 75, color: 'bg-purple-600' },
    { name: 'RAG Chatbot', progress: 40, color: 'bg-blue-600' },
  ];

  const recentDocuments = [
    { name: 'NEXA_Project_Proposal.pdf', time: '2h ago' },
    { name: 'Resume_Ananya.pdf', time: '1d ago' },
    { name: 'AI_Notes_Summary.pdf', time: '2d ago' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {greeting}, Ananya! 👋
            </h1>
            <p className="text-gray-400 mt-1">
              Here's what's happening in your digital world today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-800/50 rounded-full px-4 py-2 text-sm text-gray-300 border border-gray-700">
              <Clock className="w-4 h-4 inline mr-2" />
              {currentTime}
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categoryCards.map((card) => (
            <div key={card.label} className={`${card.bg} ${card.border} border rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer`}>
              <card.icon className={`w-6 h-6 ${card.color} mb-2`} />
              <p className="text-sm font-semibold text-white">{card.label}</p>
              <p className="text-xs text-gray-400">{card.tasks} tasks</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Plan */}
          <div className="nexa-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Today's Plan</h3>
              <button className="text-xs text-purple-400 hover:text-purple-300">View Full Schedule →</button>
            </div>
            <div className="space-y-4">
              {todayPlan.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs text-gray-400 w-12 pt-1">{item.time}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.task}</p>
                    <span className={`text-xs ${item.color}`}>{item.category}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Priority Score */}
          <div className="nexa-card p-6 text-center">
            <h3 className="font-semibold text-white mb-4">AI Priority Score</h3>
            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a2e" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" stroke="url(#gradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  strokeDasharray={`${87 * 2.51} 251.2`}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <p className="text-4xl font-bold text-white">87</p>
                  <p className="text-xs text-gray-400">/100</p>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">Great! You're on track.</p>
            <button className="mt-4 text-xs text-purple-400 hover:text-purple-300">View Insights →</button>
          </div>

          {/* Updates for You */}
          <div className="nexa-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Updates for You</h3>
              <button className="text-xs text-purple-400 hover:text-purple-300">View All →</button>
            </div>
            <div className="space-y-4">
              {updates.map((update, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{update.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{update.title}</p>
                    <p className="text-xs text-gray-500">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Ongoing Projects */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4">Ongoing Projects</h3>
            <div className="space-y-4">
              {ongoingProjects.map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">{project.name}</span>
                    <span className="text-gray-400">{project.progress}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div className={`${project.color} h-2 rounded-full`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs text-purple-400 hover:text-purple-300">View All →</button>
          </div>

          {/* Recent Documents */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4">Recent Documents</h3>
            <div className="space-y-3">
              {recentDocuments.map((doc, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs text-purple-400 hover:text-purple-300">View All →</button>
          </div>

          {/* Quick Actions */}
          <div className="nexa-card p-6">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <button key={i} className={`${action.color} rounded-lg p-3 text-white text-sm font-medium flex items-center gap-2 transition-all`}>
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Tools Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">AI Tools</h3>
            <button className="text-xs text-purple-400 hover:text-purple-300">Explore All →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: '🔍', label: 'AI Search' },
              { icon: '📝', label: 'AI Notes' },
              { icon: '✍️', label: 'AI Writer' },
              { icon: '🖼️', label: 'AI Image' },
              { icon: '🎬', label: 'AI Video' },
              { icon: '💻', label: 'AI Code' },
              { icon: '📄', label: 'AI OCR' },
              { icon: '🧠', label: 'AI Brain' },
            ].map((tool, i) => (
              <div key={i} className="nexa-card p-4 text-center cursor-pointer hover:scale-105 transition-transform">
                <span className="text-2xl">{tool.icon}</span>
                <p className="text-xs text-gray-300 mt-2">{tool.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}