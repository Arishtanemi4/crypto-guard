import json
import os
import ollama

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "governance_proposals.json")

# --- CORE LOGIC ---
def audit_governance(coin_name: str):
    """
    Audits a specific DAO's proposal by looking up the coin name.
    """
    # 1. Load Data
    if not os.path.exists(DATA_PATH):
        return {"risk_score": 0, "risk_level": "ERROR", "reason": "Database file not found."}

    try:
        with open(DATA_PATH, 'r') as f:
            full_data = json.load(f)
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": f"Corrupt DB: {str(e)}"}
    
    # 2. Lookup Project
    target_project = coin_name.lower()
    
    if target_project not in full_data:
        return {
            "risk_score": 0, 
            "risk_level": "UNKNOWN", 
            "reason": f"Project '{coin_name}' not found in governance records."
        }
        
    target_data = full_data[target_project]

    # 3. System Prompt
    system_prompt = """
    You are a Senior DAO Governance Auditor.
    Your task is to analyze a governance proposal to detect "Governance Coups" or "Flash Loan Attacks".
    
    RISK MATRIX (Follow strictly):
    - CRITICAL (Score 80-100): 
        * Funding source is "Flash Loan". 
        * Execution Delay is "0 seconds" or "Instant".
        * Voting Period is extremely short (< 1 hour).
    - MEDIUM (Score 40-79):
        * Fresh wallet proposer, or short execution delay (< 12 hours).
    - LOW (Score 0-39): 
        * Execution Delay is > 24 hours (Timelock).
        * Proposer has long-term history.
    
    OUTPUT FORMAT:
    Return a strictly valid JSON object:
    {
        "risk_score": (int),
        "risk_level": (str),
        "reason": (str)
    }
    """

    # 4. AI Analysis
    try:
        response = ollama.chat(
            model="llama3",
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f"Audit this proposal for {coin_name.upper()}: {json.dumps(target_data)}"}
            ],
            format='json'
        )
        return json.loads(response['message']['content'])
        
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": str(e)}