import { Search } from 'lucide-react';

export default function LandingPage({ coins, onSelect }) {
  return (
    <div className="fade-in">
      {/* Search Bar (Visual Only) */}
      <div className="search-bar">
        <Search size={20} color="#666" />
        <input 
          type="text" 
          placeholder="Search Asset or Contract Address..." 
          disabled 
        />
      </div>

      <h3 className="section-title">AVAILABLE TARGETS</h3>
      
      {/* Coin Grid */}
      <div className="coin-grid">
        {Object.keys(coins).map((key) => {
          const coin = coins[key];
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
              
              <div className="scan-btn">INITIATE SCAN</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}