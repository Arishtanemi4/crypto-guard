import json
import ollama

def scan(scenario_type="danger_scenario"):
    """
    Scans social media data for Coordinated Inauthentic Behavior (CIB).
    """
    
    # 1. Load the data
    try:
        with open("data/social_feed.json", 'r') as f:
            full_data = json.load(f)
    except FileNotFoundError:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": "data/social_feed.json file not found."}
    
    # 2. Select the specific scenario (Safe vs Danger)
    if scenario_type not in full_data:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": f"Scenario '{scenario_type}' not found."}
        
    target_data = full_data[scenario_type]

    # 3. The Professional System Prompt
    system_prompt = """
    You are a Senior Threat Intelligence Analyst specializing in Social Engineering Detection.
    Your objective is to identify "Bot Swarms" and "Astroturfing" campaigns in crypto projects.
    
    Analyze the provided tweet data for the following Risk Indicators:
    1. Temporal Coordination: Multiple tweets posted at the exact same second.
    2. Semantic Repetition: Identical phrasing across different accounts.
    3. Account Age Anomalies: A high density of accounts < 3 days old.
    
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
                {'role': 'user', 'content': f"Analyze this dataset: {json.dumps(target_data)}"}
            ],
            format='json' # Forces strictly valid JSON response
        )
        return json.loads(response['message']['content'])
        
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": str(e)}

# --- TESTING BLOCK (This lets you run this file directly) ---
if __name__ == "__main__":
    print("🤖 SOCIAL AGENT DIAGNOSTIC TEST")
    print("-------------------------------")
    
    # Test 1: Run the Danger Scenario
    print("\n[TEST 1] Scanning 'danger_scenario' (Expect CRITICAL)...")
    result_danger = scan("danger_scenario")
    print(json.dumps(result_danger, indent=2))
    
    # Test 2: Run the Safe Scenario
    print("\n[TEST 2] Scanning 'safe_scenario' (Expect LOW)...")
    result_safe = scan("safe_scenario")
    print(json.dumps(result_safe, indent=2))