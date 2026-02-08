import { useState } from 'react';
import { Hexagon, Activity, Search } from 'lucide-react';
import { fetchAnalysis } from './services/api'; 
import Dashboard from './components/Dashboard'; 
import Terminal from './components/Terminal'; 
import LandingPage from './components/LandingPage'; // Ensure this is imported

// --- CONFIGURATION ---
const COIN_DB = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    apiCode: "btc",
    price: "$98,420",
    img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029",
    contract_address: "0xWrappedBTC_Address",
    funding_history: [
      { from: "0xCoinbaseExchange", to: "0xWhaleWallet_1", amount: "50.0", token: "WBTC" },
      { from: "0xBinanceColdWallet", to: "0xWhaleWallet_1", amount: "12.0", token: "WBTC" }
    ]
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    apiCode: "eth",
    price: "$4,200",
    img: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
    contract_address: "0xEthereumFoundation",
    funding_history: [
      { from: "0xGenesisBlock", to: "0xDevWallet_Vitalik", amount: "1000.0", token: "ETH" }
    ]
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    apiCode: "sol",
    price: "$145",
    img: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029",
    contract_address: "0xSolanaBridge_Wormhole",
    funding_history: [
      { from: "0xFixedFloat", to: "0xSolDegen_1", amount: "200.0", token: "SOL" },
      { from: "0xUnknownExchange", to: "0xSolDegen_1", amount: "50.0", token: "SOL" }
    ]
  },
  AAVE: {
    name: "Aave",
    symbol: "AAVE",
    apiCode: "aave",
    price: "$85.50",
    img: "https://cryptologos.cc/logos/aave-aave-logo.png?v=029",
    contract_address: "0xAaveGovernanceV2",
    funding_history: [
      { from: "0xKrakenExchange", to: "0xAaveTreasury", amount: "5000.0", token: "AAVE" }
    ]
  },
  ARB: {
    name: "Arbitrum",
    symbol: "ARB",
    apiCode: "arb",
    price: "$1.12",
    img: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029",
    contract_address: "0xArbitrumSequencer",
    funding_history: [
      { from: "0xHopProtocol", to: "0xArbUser_Alpha", amount: "1500.0", token: "ARB" }
    ]
  },
  DOGE: {
    name: "Dogecoin",
    symbol: "DOGE",
    apiCode: "doge",
    price: "$0.12",
    img: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=029",
    contract_address: "0xDogeChainBridge",
    funding_history: [
      { from: "0xChangeNow_Swap", to: "0xMemeTrader_X", amount: "100000.0", token: "DOGE" }
    ]
  },
  PEPE: {
    name: "Pepe",
    symbol: "PEPE",
    apiCode: "pepe",
    price: "$0.000008",
    img: "https://cryptologos.cc/logos/pepe-pepe-logo.png?v=029",
    contract_address: "0xPepeContract_V3",
    funding_history: [
      { from: "0xTornadoCashRouter", to: "0xAnonDev_1", amount: "100.0", token: "ETH" },
      { from: "0xTornadoCashRouter", to: "0xAnonDev_2", amount: "50.0", token: "ETH" }
    ]
  },
  BEAN: {
    name: "Bean Cash",
    symbol: "BEAN",
    apiCode: "bean",
    price: "$0.001",
    img: "https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=029", // Used generic icon for safety
    contract_address: "0xBeanstalk_Exploiter",
    funding_history: [
      { from: "0xAaveFlashLoan", to: "0xAttackerWallet", amount: "10000000.0", token: "DAI" }
    ]
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
      console.error(err);
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
          <Hexagon size={40} color="#00ff9d" /> CRYPTO GUARD
        </h1>
        <p className="subtitle">AI-Powered Blockchain Defense </p>
      </div>

      {/* VIEW 1: LANDING PAGE */}
      {!selectedCoin && (
        <LandingPage 
          coins={COIN_DB} 
          onSelect={handleSelectCoin} 
        />
      )}

      {/* VIEW 2: LOADING */}
      {selectedCoin && scanning && (
        <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
           <Terminal coinName={selectedCoin.name} />
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