import time
from agents.agent_chain import analyze_wallet
from agents.agent_gov import audit_governance
from agents.agent_social import scan_social

# --- CONFIGURATION: TRUST WEIGHTS ---
WEIGHTS = {
    "SOCIAL": 0.2,  # 20% Importance
    "CHAIN":  0.5,  # 50% Importance (Critical)
    "GOV":    0.3   # 30% Importance
}

def run_council(coin_name: str):
    """
    Orchestrates the swarm:
    1. Calls all three agents (Chain, Gov, Social).
    2. Aggregates their risk scores based on weights.
    3. Returns a final verdict.
    """
    
    # 1. GATHER INTELLIGENCE
    # We pass the same 'entity_name' to all agents. 
    # (e.g. "solana" works for social/gov, and we assume chain handles it or maps it)
    chain_res = analyze_wallet(coin_name)
    gov_res = audit_governance(coin_name)
    social_res = scan_social(coin_name)

    # 2. EXTRACT SCORES (Default to 0 if error)
    score_chain = chain_res.get("risk_score", 0)
    score_gov = gov_res.get("risk_score", 0)
    score_social = social_res.get("risk_score", 0)

    # 3. CALCULATE WEIGHTED CONSENSUS
    weighted_score = (score_chain * WEIGHTS["CHAIN"]) + \
                     (score_gov * WEIGHTS["GOV"]) + \
                     (score_social * WEIGHTS["SOCIAL"])

    # 4. DETERMINE VERDICT
    if weighted_score > 60:
        verdict = "BLOCKED"
        risk_level = "CRITICAL"
        action = "Transaction Rejected. Wallet Frozen."
    elif weighted_score > 30:
        verdict = "FLAGGED"
        risk_level = "MEDIUM"
        action = "Manual Review Recommended."
    else:
        verdict = "APPROVED"
        risk_level = "LOW"
        action = "Transaction Executed."

    # 5. RETURN STRUCTURED REPORT
    return {
        "entity": coin_name,
        "final_risk_score": int(weighted_score),
        "overall_risk_level": risk_level,
        "verdict": verdict,
        "action": action,
        "breakdown": {
            "chain_agent": {
                "score": score_chain,
                "weight": "50%",
                "reason": chain_res.get("reason")
            },
            "gov_agent": {
                "score": score_gov,
                "weight": "30%",
                "reason": gov_res.get("reason")
            },
            "social_agent": {
                "score": score_social,
                "weight": "20%",
                "reason": social_res.get("reason")
            }
        }
    }