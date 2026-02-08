import { Lock, Users, Vote, ArrowLeft, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Helper for Colors based on Risk Level
const getStatusColor = (level) => {
  if (level === "CRITICAL" || level === "HIGH") return "status-CRITICAL";
  if (level === "MEDIUM") return "status-MEDIUM";
  return "status-LOW";
};

// Helper for Icons
const getStatusIcon = (level) => {
  if (level === "CRITICAL" || level === "HIGH") return <ShieldAlert size={40} color="#ff0055" />;
  if (level === "MEDIUM") return <AlertTriangle size={40} color="#ffcc00" />;
  return <ShieldCheck size={40} color="#00ff9d" />;
};

export default function Dashboard({ data, coin, onBack }) {
  // Map your API response to the Chart Data
  const chartData = [
    { subject: 'Social', A: data.breakdown.social_agent.score, fullMark: 100 },
    { subject: 'Chain', A: data.breakdown.chain_agent.score, fullMark: 100 },
    { subject: 'Gov', A: data.breakdown.gov_agent.score, fullMark: 100 },
  ];

  return (
    <div className="fade-in">
      <button onClick={onBack} className="back-btn">
        <ArrowLeft size={18} /> RETURN TO SEARCH
      </button>

      <div className="results-header">
        <img src={coin.img} className="coin-logo-large" alt={coin.name} />
        <div>
          <h2 style={{ margin: 0 }}>{coin.name} ({coin.symbol})</h2>
          <span className="contract-badge">Protocol Analysis</span>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* BIG VERDICT CARD */}
        <div className={`card full-width verdict-card ${getStatusColor(data.overall_risk_level)}`}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
            {getStatusIcon(data.overall_risk_level)}
          </div>
          <h2 style={{ fontSize: '2.5rem', margin: '0' }}>{data.overall_risk_level} RISK</h2>
          <div className="verdict-details">
            <span>FINAL SCORE: <strong>{data.final_risk_score}/100</strong></span>
            <span>VERDICT: <strong>{data.verdict}</strong></span>
          </div>
          <p style={{ marginTop: '15px', fontStyle: 'italic', color: '#888' }}>
            "{data.action}"
          </p>
        </div>

        {/* RADAR CHART */}
        <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ marginBottom: 0 }}>RISK TOPOLOGY</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Risk" dataKey="A" stroke="#ff0055" strokeWidth={3} fill="#ff0055" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AGENT CARD 1: CHAIN */}
        <AgentCard 
          title="Chain Forensic" 
          icon={<Lock />} 
          score={data.breakdown.chain_agent.score} 
          reason={data.breakdown.chain_agent.reason} 
        />

        {/* AGENT CARD 2: GOV */}
        <AgentCard 
          title="Gov Audit" 
          icon={<Vote />} 
          score={data.breakdown.gov_agent.score} 
          reason={data.breakdown.gov_agent.reason} 
        />

        {/* AGENT CARD 3: SOCIAL */}
        <AgentCard 
          title="Social Intel" 
          icon={<Users />} 
          score={data.breakdown.social_agent.score} 
          reason={data.breakdown.social_agent.reason} 
        />

      </div>
    </div>
  );
}

function AgentCard({ title, icon, score, reason }) {
  // Determine color locally based on score
  let level = "LOW";
  if (score >= 80) level = "CRITICAL";
  else if (score >= 40) level = "MEDIUM";

  return (
    <div className={`card agent-card status-${level}`}>
      <div className="agent-header">
        {icon} <h3>{title}</h3>
      </div>
      <div className="agent-score">
        <h2>{level}</h2>
        <span className="score-badge">{score}/100</span>
      </div>
      <p className="agent-reason">{reason}</p>
    </div>
  );
}