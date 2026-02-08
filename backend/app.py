import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # <--- NEW IMPORT

# Import individual agent logic
# Ensure your folder structure allows these imports (e.g., app.py is outside the agents folder or configured correctly)
# If app.py is IN the agents folder, change these to: import agent_chain, agent_gov, agent_social
from agents.agent_chain import analyze_wallet
from agents.agent_gov import audit_governance
from agents.agent_social import scan_social
from agents.agent_orchestrator import run_council

# Initialize App
app = FastAPI(title="Crypto-Guard: Orchestrator", version="3.0")

# --- NEW: CONFIGURE CORS ---
# This allows your React app (http://localhost:5173) to talk to this API
origins = [
    "http://localhost:5173",  # React Default Port
    "http://localhost:3000",  # Alternate Port
    "*"                       # Allow all (for testing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API ENDPOINTS ---

@app.get("/agent/chain")
def get_chain_audit(coin_name: str):
    return analyze_wallet(coin_name)

@app.get("/agent/gov")
def get_gov_audit(coin_name: str):
    return audit_governance(coin_name)

@app.get("/agent/social")
def get_social_scan(coin_name: str):
    return scan_social(coin_name)

@app.get("/orchestrate")
def orchestrate_analysis(coin_name: str):
    """
    Triggers the full swarm analysis for a given coin.
    USAGE: GET /orchestrate?coin_name=solana
    """
    print(f"🤖 Convening Council for: {coin_name}")
    return run_council(coin_name)

# --- RUNNER ---
if __name__ == "__main__":
    print("🚀 Starting Crypto-Guard API on Port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)