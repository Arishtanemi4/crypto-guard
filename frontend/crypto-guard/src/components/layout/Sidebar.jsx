import React from 'react';
import { LayoutDashboard, Users, Map, Settings, FileText, AlertTriangle, Radio } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Agent Swarm', active: false },
    { icon: Map, label: 'Threat Map', active: false },
    { icon: Radio, label: 'Live Signals', active: false },
    { icon: AlertTriangle, label: 'Incidents', active: false },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-gray-800 bg-gray-950/50 h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4 space-y-1">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-2">
          Platform
        </p>
        
        {navItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
              ${item.active 
                ? 'bg-cyan-950/30 text-cyan-400 border border-cyan-900/50' 
                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-900'
              }`}
          >
            <item.icon 
              size={18} 
              className={`${item.active ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} 
            />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          System
        </p>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-900 rounded-lg transition-colors">
          <FileText size={18} className="text-gray-500" />
          Logs
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-900 rounded-lg transition-colors">
          <Settings size={18} className="text-gray-500" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;