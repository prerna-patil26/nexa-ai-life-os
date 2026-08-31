'use client';
import Link from 'next/link';
import { 
  Home, Target, Users, Eye, Briefcase, GraduationCap, 
  Sparkles, Search, ShoppingBag, Plane, FileText, Code 
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Target, label: 'Missions', href: '/missions' },
  { icon: Users, label: 'Agents', href: '/agents' },
  { icon: Eye, label: 'Vision Lab', href: '/vision' },
  { icon: Briefcase, label: 'Career', href: '/career' },
  { icon: GraduationCap, label: 'Learning', href: '/learning' },
  { icon: Sparkles, label: 'Creator', href: '/creator' },
  { icon: Search, label: 'Research', href: '/research' },
  { icon: ShoppingBag, label: 'Shopping', href: '/shopping' },
  { icon: Plane, label: 'Travel', href: '/travel' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Code, label: 'Developer', href: '/developer' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
        <span className="font-bold text-xl">NEXA</span>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
