import { Search, ArrowRightLeft } from 'lucide-react';

export default function LandingPage({ coins, onSelect }) {
  return (
    <div className="fade-in">
      {/* Search Bar */}
      <div className="search-bar">
        <Search size={20} color="#666" />
        <input 
          type="text" 
          placeholder="Search Asset or Contract Address..." 
          disabled 
        />
      </div>

      <h3 className="section-title">AVAILABLE TARGETS</h3>
      
      <div className="coin-grid">
        {Object.keys(coins).map((key) => {
          const coin = coins[key];
          
          // EXTRACT FUNDING SOURCE
          // We grab the first one safely using optional chaining (?.)
          const primarySource = coin.funding_history?.[0]?.from || "Unknown Source";
          const extraSources = coin.funding_history?.length > 1 
            ? coin.funding_history.length - 1 
            : 0;

          return (
            <div 
              key={key} 
              className="card coin-card" 
              onClick={() => onSelect(key)}
            >
              <div className="coin-header">
                <img 
                  src={coin.img} 
                  alt={coin.name} 
                  className="coin-logo" 
                />
                <span className="coin-symbol">{coin.symbol}</span>
              </div>
              
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price">{coin.price}</div>

              {/* NEW: FUNDING SOURCE DISPLAY */}
              <div className="coin-source">
                <div className="source-label">
                  <ArrowRightLeft size={12} /> Seller:
                </div>
                <div className="source-value">
                  {primarySource.replace("0x", "") /* Clean up 0x for space if needed */}
                  {extraSources > 0 && <span className="source-badge">+{extraSources}</span>}
                </div>
              </div>
              
              <div className="scan-btn">INITIATE SCAN</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}