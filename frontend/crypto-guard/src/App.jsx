import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import SwarmMonitor from './components/agents/SwarmMonitor';
import AgentCard from './components/agents/AgentCard';
import LiveFeed from './components/dashboard/LiveFeed';

// --- MOCK DATA ---
const MOCK_AGENTS = [
  {
    id: 1,
    type: 'social',
    name: 'Agent Social',
    role: 'The Hype Hunter',
    status: 'active',
    metrics: [
      { label: 'Sources Monitored', value: '1,240' },
      { label: 'Bot Activity', value: '12%' },
    ]
  },
  {
    id: 2,
    type: 'chain',
    name: 'Agent Chain',
    role: 'The Chainstalker',
    status: 'active',
    metrics: [
      { label: 'Blocks Scanned', value: '84,392' },
      { label: 'Large Transfers', value: '3' },
    ]
  },
  {
    id: 3,
    type: 'gov',
    name: 'Agent Gov',
    role: 'The Sentinel',
    status: 'idle',
    metrics: [
      { label: 'Proposals Analyzed', value: '45' },
      { label: 'Vote Anomalies', value: '0' },
    ]
  }
];

const MOCK_LOGS = [
  { id: 1, source: 'twitter', severity: 'high', timestamp: '10:42:05', message: 'Detected coordinated bot swarm promoting $SCAM coin on #Solana.' },
  { id: 2, source: 'chain', severity: 'medium', timestamp: '10:41:12', message: 'Wallet 0x8f...2a just moved 500 ETH to Tornado Cash.' },
  { id: 3, source: 'gov', severity: 'low', timestamp: '10:39:00', message: 'New governance proposal #402 created. Analysis pending.' },
  { id: 4, source: 'twitter', severity: 'low', timestamp: '10:35:22', message: 'Unusual spike in sentiment for #Bitcoin.' },
  { id: 5, source: 'chain', severity: 'high', timestamp: '10:30:15', message: 'Flash loan attack pattern detected on Aave V3.' },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-cyan-500/30 flex flex-col">
      
      {/* 1. Header (Fixed Top) */}
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Sidebar (Fixed Left, Hidden on Mobile) */}
        <Sidebar />

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-black p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Top Row: Swarm Visualizer & Live Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[450px]">
              
              {/* Left Column: Visual Monitor */}
              <div className="lg:col-span-2 h-[400px] lg:h-full">
                <SwarmMonitor />
              </div>

              {/* Right Column: Live Data Feed */}
              <div className="lg:col-span-1 h-[400px] lg:h-full">
                <LiveFeed logs={MOCK_LOGS} />
              </div>
            </div>

            {/* Middle Row: Section Title */}
            <div className="flex items-center justify-between pt-4">
              <h2 className="text-xl font-bold text-white tracking-tight">Active Agents</h2>
              <div className="px-3 py-1 bg-cyan-950/30 border border-cyan-900/50 rounded text-cyan-400 text-xs font-mono">
                SYNCED: 100%
              </div>
            </div>

            {/* Bottom Row: Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {MOCK_AGENTS.map((agent) => (
                <AgentCard key={agent.id} {...agent} />
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;