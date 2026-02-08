import time
import sys
from colorama import init, Fore, Style
from agents import agent_social, agent_chain, agent_gov

# Initialize output colors
init()

# --- CONFIGURATION: THE TRUST WEIGHTS ---
# We trust the Blockchain (Chain) more than Twitter (Social).
WEIGHTS = {
    "SOCIAL": 0.2,  # 20% Importance
    "CHAIN":  0.5,  # 50% Importance (Critical)
    "GOV":    0.3   # 30% Importance
}

def type_print(text, delay=0.01):
    """Effect: Types text out like a hacker terminal"""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def run_council(scenario_type="danger_scenario"):
    print(Fore.CYAN + "\n🤖 ORCHESTRATOR: Convening the Council of Agents..." + Style.RESET_ALL)
    print(Fore.CYAN + f"   Target Scenario: {scenario_type.upper()}" + Style.RESET_ALL)
    print("-" * 50)

    # 1. GATHER INTELLIGENCE (Parallel Execution Simulation)
    
    # --- Step A: Social Agent ---
    print("   🐦 Contacting Agent Social...", end=" ")
    time.sleep(1) # Simulating network lag
    social_res = agent_social.scan(scenario_type)
    print(f"DONE. Risk: {social_res['risk_score']}/100")

    # --- Step B: Chain Agent ---
    print("   🔗 Contacting Agent Chain...", end=" ")
    time.sleep(1)
    chain_res = agent_chain.trace(scenario_type)
    print(f"DONE. Risk: {chain_res['risk_score']}/100")

    # --- Step C: Gov Agent ---
    print("   ⚖️  Contacting Agent Gov...", end=" ")
    time.sleep(1)
    gov_res = agent_gov.audit(scenario_type)
    print(f"DONE. Risk: {gov_res['risk_score']}/100")

    print("-" * 50)
    
    # 2. CALCULATE WEIGHTED CONSENSUS
    print(Fore.YELLOW + "🧮 CALCULATING WEIGHTED PROBABILITY..." + Style.RESET_ALL)
    
    # The Math
    weighted_social = social_res['risk_score'] * WEIGHTS["SOCIAL"]
    weighted_chain = chain_res['risk_score'] * WEIGHTS["CHAIN"]
    weighted_gov = gov_res['risk_score'] * WEIGHTS["GOV"]
    
    total_risk_score = weighted_social + weighted_chain + weighted_gov
    
    # Display the Math to the User (Transparency)
    print(f"   Social Impact: {weighted_social:.1f}  (Score {social_res['risk_score']} * 0.2)")
    print(f"   Chain Impact:  {weighted_chain:.1f}  (Score {chain_res['risk_score']} * 0.5)")
    print(f"   Gov Impact:    {weighted_gov:.1f}  (Score {gov_res['risk_score']} * 0.3)")
    print(f"   --------------------------------")
    print(f"   FINAL RISK SCORE: {total_risk_score:.1f} / 100")

    # 3. THE FINAL VERDICT (The Decision)
    print("\n" + "="*40)
    print("       COUNCIL FINAL DECISION")
    print("="*40)

    # Threshold: If Risk > 60, we BLOCK.
    if total_risk_score > 60:
        print(Fore.RED + f"⛔ BLOCKED (CRITICAL RISK)" + Style.RESET_ALL)
        print(f"   Confidence: {int(total_risk_score)}%")
        print(f"   Primary Reason: {chain_res['reason']}")
        print(Fore.RED + "   ACTION: Transaction Rejected. Wallet Frozen." + Style.RESET_ALL)
    elif total_risk_score > 30:
        print(Fore.YELLOW + f"⚠️ WARNING (MEDIUM RISK)" + Style.RESET_ALL)
        print(f"   Confidence: {int(total_risk_score)}%")
        print("   ACTION: Manual Review Recommended.")
    else:
        print(Fore.GREEN + f"✅ APPROVED (SAFE)" + Style.RESET_ALL)
        print(f"   Confidence: {100 - int(total_risk_score)}%")
        print("   ACTION: Transaction Executed.")

# --- MAIN EXECUTION LOOP ---
if __name__ == "__main__":
    while True:
        print("\n\n" + "#"*40)
        print("   CERBERUS PROTOCOL - CLI MODE")
        print("#"*40)
        print("1. Scan Safe Scenario")
        print("2. Scan Danger Scenario")
        print("q. Quit")
        
        choice = input("\nSelect Option: ")
        
        if choice == "1":
            run_council("safe_scenario")
        elif choice == "2":
            run_council("danger_scenario")
        elif choice == "q":
            break
        else:
            print("Invalid selection.")