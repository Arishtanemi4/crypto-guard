import React from 'react';
import { Twitter, AlertTriangle, Activity } from 'lucide-react';

const FeedItem = ({ source, message, severity, timestamp }) => {
  const severityColor = 
    severity === 'high' ? 'text-red-400 border-red-900/50 bg-red-950/10' :
    severity === 'medium' ? 'text-yellow-400 border-yellow-900/50 bg-yellow-950/10' :
    'text-cyan-400 border-cyan-900/50 bg-cyan-950/10';

  return (
    <div className={`flex gap-4 p-4 border-b border-gray-800 hover:bg-white/5 transition-colors`}>
      <div className="mt-1">
        {source === 'twitter' ? <Twitter size={16} className="text-blue-400" /> : <AlertTriangle size={16} className="text-orange-400" />}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${severityColor}`}>
            {severity.toUpperCase()} THREAT
          </span>
          <span className="text-xs text-gray-500 font-mono">{timestamp}</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

const LiveFeed = ({ logs }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <Activity size={18} className="text-cyan-400" />
          Swarm Intelligence Feed
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {logs.map((log) => (
          <FeedItem key={log.id} {...log} />
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;