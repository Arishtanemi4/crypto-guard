import json
import os
import ollama

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "chain_history.json")

# --- CORE LOGIC ---
def analyze_wallet(coin_name: str):
    """
    Analyzes the specific coin's funding history from the JSON store.
    """
    # 1. Load Data
    if not os.path.exists(DATA_PATH):
        return {"risk_score": 0, "risk_level": "ERROR", "reason": "Database file not found."}

    try:
        with open(DATA_PATH, 'r') as f:
            full_data = json.load(f)
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": f"Corrupt DB: {str(e)}"}
    
    # 2. Lookup Coin
    target_coin = coin_name.lower()
    
    if target_coin not in full_data:
        return {
            "risk_score": 0, 
            "risk_level": "UNKNOWN", 
            "reason": f"Coin '{coin_name}' not found in chain history."
        }
        
    target_data = full_data[target_coin]

    # 3. System Prompt
    system_prompt = """
    You are a Senior Blockchain Forensic Investigator. 
    Your task is to analyze the funding history of a wallet to detect Money Laundering (AML) risks.
    
    RISK MATRIX:
    - CRITICAL (Score 80-100): Funding from "Tornado", "Mixer", "Blender", or known hackers.
    - MEDIUM (Score 40-79): Funding from High-Risk Exchanges (FixedFloat, Sideshift) or fresh wallets.
    - LOW (Score 0-39): Funding from KYC-compliant CEXs (Coinbase, Binance, Kraken).
    
    OUTPUT FORMAT:
    Return a strictly valid JSON object:
    {
        "risk_score": (int),
        "risk_level": (str: "LOW", "MEDIUM", "CRITICAL"),
        "reason": (str: concise explanation)
    }
    """

    # 4. AI Analysis
    try:
        response = ollama.chat(
            model="llama3",
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f"Analyze this trace for {coin_name.upper()}: {json.dumps(target_data)}"}
            ],
            format='json'
        )
        return json.loads(response['message']['content'])
        
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": str(e)}