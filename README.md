Crypto Guard

A Multi-Agent Framework for On-Chain Asset Verification and Risk Assessment.

Overview
Crypto Guard is an automated risk-assessment engine designed to evaluate the contextual security of digital assets. While traditional security tools primarily focus on static smart contract audits, they often fail to detect off-chain and contextual fraud vectors, such as illicit funding sources, coordinated social manipulation, and malicious governance structures.

This project introduces a multi-agent architecture that evaluates the holistic risk of a cryptocurrency by analyzing the deployer's history, social sentiment integrity, and governance parameters. 

Core Architecture
The framework operates via three specialized analytical modules:
- Chain Analysis Agent: Performs recursive backward tracing on deployer wallets to identify the provenance of deployment funds, flagging interactions with high-risk entities or privacy mixers.
- Social Intelligence Agent: Conducts temporal and sentiment analysis across social networks to identify sybil activity and coordinated inauthentic behavior (CIB) surrounding an asset's community.
- Governance Sentinel Agent: Audits governance contract parameters, specifically analyzing execution delays and time-locks to identify potential flash-loan vulnerability vectors.


Installation and Setup

Follow the instructions below to set up the backend and frontend environments locally.

Backend Setup
Navigate to the backend directory:
```bash
cd backend
