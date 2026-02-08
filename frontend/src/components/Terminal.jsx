import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal({ coinName }) {
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Dynamic logs based on the coin selected
  const SYSTEM_LOGS = [
    `> Initializing Cerberus Protocol v3.0...`,
    `> Target Identified: ${coinName ? coinName.toUpperCase() : 'UNKNOWN'}`,
    `> Establishing handshake with Neural Council...`,
    `> [CHAIN] Querying Layer-1 Blockchain History...`,
    `> [CHAIN] Analyzing Transaction Graphs (Depth: 100)...`,
    `> [SOCIAL] Scraping Twitter/X API for sentiment...`,
    `> [SOCIAL] filtering_bots.py --active`,
    `> [GOV] Downloading recent DAO Proposals...`,
    `> [GOV] Auditing Timelock Contracts...`,
    `> Aggregating Multi-Agent Weighted Scores...`,
    `> CALCULATING FINAL VERDICT...`
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    // Clear logs on mount
    setLogs([]);

    const interval = setInterval(() => {
      if (currentIndex < SYSTEM_LOGS.length) {
        setLogs((prev) => [...prev, SYSTEM_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 600); // Adjust speed (600ms per line)

    return () => clearInterval(interval);
  }, [coinName]);

  // Auto-scroll to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <TerminalIcon size={16} /> CERBERUS_CLI_V3.0.exe
      </div>
      <div className="terminal-body">
        {logs.map((log, index) => (
          <div key={index} className="log-line log-safe">
            {log}
          </div>
        ))}
        <div ref={logsEndRef} />
        <div className="cursor-blink">_</div>
      </div>
    </div>
  );
}