import uvicorn
from fastapi import FastAPI

# --- IMPORTS ---
# Import individual agent logic
from agents.agent_chain import analyze_wallet
from agents.agent_gov import audit_governance
from agents.agent_social import scan_social
# Import the new orchestrator logic
from agents.agent_orchestrator import run_council

# Initialize App
app = FastAPI(title="Crypto-Guard: Orchestrator", version="3.0")

# --- API ENDPOINTS ---

@app.get("/agent/chain")
def get_chain_audit(coin_name: str):
    return analyze_wallet(coin_name)

@app.get("/agent/gov")
def get_gov_audit(project_name: str):
    return audit_governance(project_name)

@app.get("/agent/social")
def get_social_scan(project_name: str):
    return scan_social(project_name)

@app.get("/orchestrate")
def orchestrate_analysis(entity_name: str):
    """
    Triggers the full swarm analysis for a given entity.
    USAGE: GET /orchestrate?entity_name=solana
    """
    print(f"🤖 Convening Council for: {entity_name}")
    return run_council(entity_name)

# --- RUNNER ---
if __name__ == "__main__":
    print("🚀 Starting Crypto-Guard API on Port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)