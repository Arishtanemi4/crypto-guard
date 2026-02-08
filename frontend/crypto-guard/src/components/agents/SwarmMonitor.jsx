import React from 'react';
import { Globe, Database, Vote, Cpu, Activity } from 'lucide-react';

const SwarmMonitor = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden h-[400px] flex items-center justify-center">
      {/* Background Grid & Noise */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,#111827_100%)"></div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Connecting Lines */}
        <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.3" />
        <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.3" />
        <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.3" />
        
        {/* Animated Data Packets (Simulated via CSS classes below) */}
        <circle cx="50%" cy="50%" r="4" fill="#22d3ee" className="animate-ping opacity-75" />
      </svg>

      {/* Central Consensus Node */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-cyan-950/50 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] relative">
          <Cpu size={32} className="text-cyan-400" />
          <div className="absolute inset-0 border border-cyan-400 rounded-full animate-ping opacity-20"></div>
        </div>
        <span className="mt-3 text-cyan-400 font-mono text-xs tracking-wider bg-cyan-950/80 px-2 py-1 rounded border border-cyan-900">
          CONSENSUS ENGINE
        </span>
      </div>

      {/* Agent Nodes - Positioned Absolutely */}
      
      {/* Top Left: Social Agent */}
      <div className="absolute top-[20%] left-[15%] flex flex-col items-center z-10 group cursor-pointer">
        <div className="w-14 h-14 bg-gray-800 border border-gray-600 group-hover:border-pink-500 rounded-xl flex items-center justify-center transition-colors shadow-lg">
          <Globe size={24} className="text-pink-400" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs font-bold text-gray-300">Social Agent</p>
          <p className="text-[10px] text-gray-500">Hype Hunter</p>
        </div>
      </div>

      {/* Top Right: Chain Agent */}
      <div className="absolute top-[20%] right-[15%] flex flex-col items-center z-10 group cursor-pointer">
        <div className="w-14 h-14 bg-gray-800 border border-gray-600 group-hover:border-emerald-500 rounded-xl flex items-center justify-center transition-colors shadow-lg">
          <Database size={24} className="text-emerald-400" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs font-bold text-gray-300">Chain Agent</p>
          <p className="text-[10px] text-gray-500">The Chainstalker</p>
        </div>
      </div>

      {/* Bottom Center: Gov Agent */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center z-10 group cursor-pointer">
        <div className="w-14 h-14 bg-gray-800 border border-gray-600 group-hover:border-amber-500 rounded-xl flex items-center justify-center transition-colors shadow-lg">
          <Vote size={24} className="text-amber-400" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs font-bold text-gray-300">Gov Agent</p>
          <p className="text-[10px] text-gray-500">The Sentinel</p>
        </div>
      </div>

      {/* Live Status overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-gray-800">
        <Activity size={14} className="text-green-500" />
        <span className="text-xs text-green-500 font-mono">LIVE DATA FEED</span>
      </div>
    </div>
  );
};

export default SwarmMonitor;