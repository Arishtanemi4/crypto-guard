import json
import os
import ollama

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "social_feed.json")

# --- CORE LOGIC ---
def scan_social(coin_name: str):
    """
    Scans social media data for a specific coin to detect Bot Swarms/CIB.
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
            "reason": f"Project '{coin_name}' not found in social feed."
        }
        
    target_data = full_data[target_project]

    # 3. System Prompt
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

    # 4. AI Analysis
    try:
        response = ollama.chat(
            model="llama3",
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f"Analyze this dataset for {coin_name.upper()}: {json.dumps(target_data)}"}
            ],
            format='json'
        )
        return json.loads(response['message']['content'])
        
    except Exception as e:
        return {"risk_score": 0, "risk_level": "ERROR", "reason": str(e)}