import React from 'react';
import { Shield, Bell, Menu, Search, User } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Left: Logo & Menu Trigger */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
              <Shield size={24} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                Synapse <span className="text-cyan-500">Protocol</span>
              </h1>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                Hive Mind Security
              </span>
            </div>
          </div>
        </div>

        {/* Center: Quick Search (Optional for hackathon, adds realism) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              placeholder="Search transaction hash or topic..."
              className="h-9 w-full rounded-md border border-gray-800 bg-gray-900 pl-9 pr-4 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-xs font-medium text-gray-300">System Status</span>
            <span className="text-[10px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              OPERATIONAL
            </span>
          </div>

          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-950"></span>
          </button>
          
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-500 flex items-center justify-center">
            <User size={16} className="text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;