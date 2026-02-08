import json
import ollama

def trace(scenario_type="danger_scenario"):
    """
    Analyzes blockchain wallet history for Money Laundering risks.
    """
    
    # 1. Load the data
    try:
        with open("data/chain_history.json", 'r') as f:
            full_data = json.load(f)
    except FileNotFoundError:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": "data/chain_history.json file not found."}
    
    # 2. Select the specific scenario
    if scenario_type not in full_data:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": f"Scenario '{scenario_type}' not found."}
        
    target_data = full_data[scenario_type]

    # 3. The Forensic System Prompt
    system_prompt = """
    You are a Senior Blockchain Forensic Investigator. 
    Your task is to analyze the funding history of a smart contract deployer wallet to detect illicit funds.
    
    RISK MATRIX (Follow strictly):
    - CRITICAL RISK: Funding source contains "Tornado", "Mixer", "Blender", or known exploiters.
    - MEDIUM RISK: Funding from High-Risk Exchanges (e.g., FixedFloat) or fresh wallets with no history.
    - LOW RISK: Funding from KYC-compliant CEXs (e.g., Coinbase, Binance, Kraken).
    
    OUTPUT FORMAT:
    Return a strictly valid JSON object with these keys:
    - "risk_score": (Integer 0-100)
    - "risk_level": (String "LOW", "MEDIUM", or "CRITICAL")
    - "reason": (String, a concise technical explanation of the findings)
    """

    # 4. Call Llama 3
    try:
        response = ollama.chat(
            model="llama3",
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f"Analyze this wallet trace: {json.dumps(target_data)}"}
            ],
            format='json' # Forces strictly valid JSON response
        )
        return json.loads(response['message']['content'])
        
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": str(e)}

# --- TESTING BLOCK (Run this file directly to test) ---
if __name__ == "__main__":
    print("🔗 CHAIN AGENT DIAGNOSTIC TEST")
    print("------------------------------")
    
    # Test 1: Run the Danger Scenario (Expect CRITICAL / Tornado Cash)
    print("\n[TEST 1] Tracing 'danger_scenario' (Expect CRITICAL)...")
    result_danger = trace("danger_scenario")
    print(json.dumps(result_danger, indent=2))
    
    # Test 2: Run the Safe Scenario (Expect LOW / Coinbase)
    print("\n[TEST 2] Tracing 'safe_scenario' (Expect LOW)...")
    result_safe = trace("safe_scenario")
    print(json.dumps(result_safe, indent=2))