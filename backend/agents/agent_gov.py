import json
import ollama

def audit(scenario_type="danger_scenario"):
    """
    Audits DAO Governance proposals for "Flash Loan" attacks and Malicious Payloads.
    """
    
    # 1. Load the data
    try:
        with open("data/governance_proposals.json", 'r') as f:
            full_data = json.load(f)
    except FileNotFoundError:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": "data/governance_proposals.json file not found."}
    
    # 2. Select the scenario
    if scenario_type not in full_data:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": f"Scenario '{scenario_type}' not found."}
        
    target_data = full_data[scenario_type]

    # 3. The Governance Auditor System Prompt
    system_prompt = """
    You are a Senior DAO Governance Auditor.
    Your task is to analyze a governance proposal to detect "Governance Coups" or "Flash Loan Attacks".
    
    RISK MATRIX (Follow strictly):
    - CRITICAL RISK: 
        * Funding source is "Flash Loan". 
        * Execution Delay is "0 seconds" or "Instant".
        * Voting Period is extremely short (< 1 hour).
    - LOW RISK: 
        * Execution Delay is > 24 hours (Timelock).
        * Proposer has long-term history.
    
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
                {'role': 'user', 'content': f"Audit this proposal: {json.dumps(target_data)}"}
            ],
            format='json'
        )
        return json.loads(response['message']['content'])
        
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": str(e)}

# --- TESTING BLOCK ---
if __name__ == "__main__":
    print("⚖️  GOV AGENT DIAGNOSTIC TEST")
    print("----------------------------")
    
    # Test 1: Run the Danger Scenario (Expect CRITICAL / Flash Loan)
    print("\n[TEST 1] Auditing 'danger_scenario' (Expect CRITICAL)...")
    result_danger = audit("danger_scenario")
    print(json.dumps(result_danger, indent=2))
    
    # Test 2: Run the Safe Scenario (Expect LOW / Timelock)
    print("\n[TEST 2] Auditing 'safe_scenario' (Expect LOW)...")
    result_safe = audit("safe_scenario")
    print(json.dumps(result_safe, indent=2))