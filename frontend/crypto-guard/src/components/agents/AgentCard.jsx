import React from 'react';
import { Activity, Shield, Globe, Database, Vote } from 'lucide-react';

const icons = {
  social: Globe,
  chain: Database,
  gov: Vote,
};

const AgentCard = ({ type, name, role, status, metrics }) => {
  const Icon = icons[type] || Activity;
  const isActive = status === 'active';

  return (
    <div className={`p-6 rounded-xl border ${isActive ? 'border-cyan-500/50 bg-cyan-950/10' : 'border-gray-700 bg-gray-900'} transition-all`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-500'}`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{name}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{role}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-mono ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {status === 'active' ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
      
      {/* Agent Specific Metrics */}
      <div className="space-y-2">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-400">{metric.label}</span>
            <span className="text-gray-200 font-mono">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentCard;