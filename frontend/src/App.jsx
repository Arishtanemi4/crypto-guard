import { useState, useEffect } from 'react'
import { ShieldAlert, ShieldCheck, Activity, Lock, Users, Vote, ArrowLeft, Hexagon, Search } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// --- MOCK DATABASE (Mapped to Coins) ---
const COIN_DB = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$98,420",
    scenario: "safe", // Maps to Safe Scenario
    img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    price: "$4,200",
    scenario: "safe",
    img: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
  },
  SCAM: {
    name: "SafeMoon 2.0",
    symbol: "SFM2",
    price: "$0.0000001",
    scenario: "danger", // Maps to Danger Scenario
    img: "https://cryptologos.cc/logos/safemoon-safemoon-logo.png?v=029"
  }
}

// The Analysis Results for those scenarios
const SCENARIO_RESULTS = {
  safe: {
    total_risk_score: 12.0,
    verdict: "APPROVED",
    action: "Asset Verified",
    details: {
      social: { risk_score: 10, risk_level: "LOW", reason: "Consistent community engagement. No bot activity." },
      chain: { risk_score: 5, risk_level: "LOW", reason: "Liquidity locked for 5 years. Top holders are CEXs." },
      gov: { risk_score: 20, risk_level: "LOW", reason: "Timelock active (48h). Proposals pass threshold." }
    }
  },
  danger: {
    total_risk_score: 92.0,
    verdict: "CRITICAL",
    action: "Do Not Trade",
    details: {
      social: { risk_score: 95, risk_level: "CRITICAL", reason: "90% of tweets from accounts < 1 day old." },
      chain: { risk_score: 100, risk_level: "CRITICAL", reason: "Deployer wallet funded by Tornado Cash." },
      gov: { risk_score: 80, risk_level: "HIGH", reason: "Ownership renounced but proxy contract hidden." }
    }
  }
}

function App() {
  const [selectedCoin, setSelectedCoin] = useState(null) // null = Landing Page
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)

  // Trigger scan when a coin is selected
  const selectCoin = (coinKey) => {
    setSelectedCoin(COIN_DB[coinKey])
    setScanning(true)
    setScanResult(null)

    // Simulate API Delay
    setTimeout(() => {
      const scenario = COIN_DB[coinKey].scenario
      setScanResult(SCENARIO_RESULTS[scenario])
      setScanning(false)
    }, 2000)
  }

  const goBack = () => {
    setSelectedCoin(null)
    setScanResult(null)
  }

  return (
    <div className="container">
      {/* Dynamic Header */}
      <div className="header">
        <h1 className="logo">
          <Hexagon size={40} color="#00ff9d" /> CERBERUS
        </h1>
        <p className="subtitle">Algorithmic Asset Integrity System</p>
      </div>

      {/* VIEW 1: LANDING PAGE (COIN SELECTOR) */}
      {!selectedCoin && (
        <div className="fade-in">
          <div className="search-bar">
            <Search size={20} color="#666" />
            <input type="text" placeholder="Search Asset or Contract Address..." disabled />
          </div>

          <h3 className="section-title">WATCHLIST // TRENDING</h3>
          <div className="coin-grid">
            {Object.keys(COIN_DB).map((key) => {
              const coin = COIN_DB[key]
              return (
                <div key={key} className="card coin-card" onClick={() => selectCoin(key)}>
                  <div className="coin-header">
                    <img src={coin.img} alt={coin.name} className="coin-logo" />
                    <span className="coin-symbol">{coin.symbol}</span>
                  </div>
                  <div className="coin-name">{coin.name}</div>
                  <div className="coin-price">{coin.price}</div>
                  <div className="scan-btn">INITIATE SCAN</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: LOADING SCREEN */}
      {selectedCoin && scanning && (
        <div className="loading-container fade-in">
          <Activity className="spin" size={80} color="#00ff9d" />
          <h2>ANALYZING {selectedCoin.name.toUpperCase()}...</h2>
          <div className="loading-steps">
            <p>🔗 Tracing Wallet History...</p>
            <p>🐦 Scaping Social Sentiment...</p>
            <p>⚖️ Auditing Governance Logs...</p>
          </div>
        </div>
      )}

      {/* VIEW 3: RESULTS DASHBOARD */}
      {selectedCoin && !scanning && scanResult && (
        <div className="fade-in">
          <button onClick={goBack} className="back-btn">
            <ArrowLeft size={18} /> RETURN TO SEARCH
          </button>

          <div className="results-header">
            <img src={selectedCoin.img} className="coin-logo-large" />
            <div>
              <h2 style={{margin: 0}}>{selectedCoin.name} ({selectedCoin.symbol})</h2>
              <span className="contract-badge">0x7a2...8b91</span>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Verdict Card */}
            <div className={`card full-width verdict-card status-${scanResult.verdict === 'CRITICAL' ? 'CRITICAL' : 'LOW'}`}>
              <h2 style={{ fontSize: '2.5rem', margin: '0' }}>{scanResult.verdict}</h2>
              <div className="verdict-details">
                <span>RISK: <strong>{scanResult.total_risk_score}/100</strong></span>
                <span>ACTION: <strong>{scanResult.action}</strong></span>
              </div>
            </div>

            

            <AgentCard title="Chain Forensic" icon={<Lock />} result={scanResult.details.chain} />
            <AgentCard title="Gov Audit" icon={<Vote />} result={scanResult.details.gov} />
            <AgentCard title="Social Intel" icon={<Users />} result={scanResult.details.social} />

            <TrustRadar data={scanResult.details} />
          </div>
        </div>
      )}
    </div>
  )
}

function AgentCard({ title, icon, result }) {
  return (
    <div className={`card agent-card status-${result.risk_level}`}>
      <div className="agent-header">
        {icon} <h3>{title}</h3>
      </div>
      <div className="agent-score">
        <h2>{result.risk_level}</h2>
        <span className="score-badge">{result.risk_score}</span>
      </div>
      <p className="agent-reason">{result.reason}</p>
    </div>
  )
}

// --- NEW COMPONENT: TRUST RADAR ---
function TrustRadar({ data }) {
  const chartData = [
    { subject: 'Social Sentiment', A: data.social.risk_score, fullMark: 100 },
    { subject: 'Code / Chain', A: data.chain.risk_score, fullMark: 100 },
    { subject: 'Governance', A: data.gov.risk_score, fullMark: 100 },
  ];

  return (
    <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{marginBottom: 0}}>RISK TOPOLOGY</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Risk"
            dataKey="A"
            stroke="#ff0055"
            strokeWidth={3}
            fill="#ff0055"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App