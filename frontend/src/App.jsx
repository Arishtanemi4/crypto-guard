import { useState } from 'react';
import { Hexagon, Activity, Search } from 'lucide-react';
import { fetchAnalysis } from './services/api'; // Import your new API service
import Dashboard from './components/Dashboard'; // Import the new Dashboard component
import Terminal from './components/Terminal';   // (Optional: Keep your Terminal component in a separate file)

// --- CONFIGURATION ---
const COIN_DB = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    apiCode: "btc", // <--- THIS IS WHAT GETS PASSED TO PYTHON
    price: "$98,420",
    img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    apiCode: "eth",
    price: "$4,200",
    img: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029"
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    apiCode: "sol",
    price: "$145",
    img: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"
  },
  BEAN: {
    name: "Bean Cash",
    symbol: "BEAN",
    apiCode: "bean",
    price: "$0.001",
    img: "https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=029" // Placeholder image
  }
};

function App() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectCoin = async (coinKey) => {
    const coin = COIN_DB[coinKey];
    setSelectedCoin(coin);
    setScanning(true);
    setError(null);

    try {
      // Call the API using the specific code (btc, eth, sol)
      const data = await fetchAnalysis(coin.apiCode);
      setScanResult(data);
    } catch (err) {
      setError("FAILED TO CONNECT TO COUNCIL. BACKEND OFFLINE?");
    } finally {
      setScanning(false);
    }
  };

  const handleBack = () => {
    setSelectedCoin(null);
    setScanResult(null);
    setError(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="logo">
          <Hexagon size={40} color="#00ff9d" /> CERBERUS
        </h1>
        <p className="subtitle">Algorithmic Asset Integrity System</p>
      </div>

      {/* VIEW 1: LANDING PAGE */}
      {!selectedCoin && (
        <div className="fade-in">
          <div className="search-bar">
            <Search size={20} color="#666" />
            <input type="text" placeholder="Search Asset (e.g. BTC, ETH)..." disabled />
          </div>

          <h3 className="section-title">AVAILABLE TARGETS</h3>
          <div className="coin-grid">
            {Object.keys(COIN_DB).map((key) => {
              const coin = COIN_DB[key];
              return (
                <div key={key} className="card coin-card" onClick={() => handleSelectCoin(key)}>
                  <div className="coin-header">
                    <img src={coin.img} alt={coin.name} className="coin-logo" />
                    <span className="coin-symbol">{coin.symbol}</span>
                  </div>
                  <div className="coin-name">{coin.name}</div>
                  <div className="coin-price">{coin.price}</div>
                  <div className="scan-btn">INITIATE SCAN</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: LOADING (You can reuse your Terminal component here) */}
      {selectedCoin && scanning && (
        <div className="loading-container fade-in">
           <Activity className="spin" size={80} color="#00ff9d" />
           <h2>SCANNING {selectedCoin.name.toUpperCase()}...</h2>
           <p>Connecting to Neural Council...</p>
        </div>
      )}

      {/* VIEW 3: DASHBOARD */}
      {selectedCoin && !scanning && scanResult && (
        <Dashboard 
          data={scanResult} 
          coin={selectedCoin} 
          onBack={handleBack} 
        />
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="card status-CRITICAL" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2 style={{ color: '#ff0055' }}>SYSTEM ERROR</h2>
          <p>{error}</p>
          <button onClick={handleBack} style={{ marginTop: '10px' }}>RESET</button>
        </div>
      )}
    </div>
  );
}

export default App;