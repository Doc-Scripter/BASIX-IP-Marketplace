# Documentation Deliverables

This document outlines the planned documentation for the BASIX-IP-Marketplace project.


## Project Overview (from instructions.md)

### Step 1: Front-end
The front-end provides a user-friendly interface for interacting with the marketplace.

### Step 2: Define the Knowledge Structure in MeTTa
- Define creators, projects, and asset relationships using atoms.
- Capture ownership, asset type (NFT, video, ticket), and utility (streaming rights, revenue share, access).
- Model token distribution and staking options.

Sample transaction, ownership knowledge representations in MeTTa:
- NFTs and their creators:
  - `(NFT Artwork1 Creator Alice Ownership 50%)`
  - `(NFT Artwork1 Creator Bob Ownership 30%)`
  - `(NFT Artwork1 Creator Charlie Ownership 20%)`
  - `(Alice BeyondTheCode NFT_001 (stream NFT_001 BeyondTheCode))`
- Phigital assets:
  - `(PhigitalAsset House1 NFT Token1 Location Mumbai)`
  - `(PhigitalAsset Car1 NFT Token2 Location Delhi)`

### Step 3: Implement Autonomous Agent Functions in MeTTa
- Automate funding and royalty payments when thresholds are met.
- Build logic for smart contract triggers and AI-based recommendations.

Sample autonomous agent functions:
- Setting, getting, and approving Ownership:
  - `(= (getOwnerShip $nft)
    (match $space (....) ($creator $percentage)))`
  - `(= (setOwnerShip $nft $newOwner)
    (addAtom $space ($nft $newOwner)))`
  - `(= (getTreshold $asset)
    (match $space (...) $treshold))`
  - `(= (checkFundingApproval $asset $funding)
    Approved/Rejected)`

### Step 4: Enable Python Integration
- Integrate Python with MeTTa to query the knowledge base and retrieve results dynamically. It also includes blockchain integration for executing transactions.

Blockchain functions:
- `def mint_nft(owner, token_id):`
- `def transfer_ownership(from_address, to_address, token_id):`
- `def update_ownership(nft, new_owner):
  metta.run(f'(setOwnership {nft} {new_owner})')`

### Step 4: Integrate Marketplace Features
- The Flask backend acts as the intermediary between the frontend, MeTTa, and the blockchain.

Sample Flask backend implementation:
- `@app.route('/mint-nft', methods=['POST'])
  Def mint_nft_route():
  # Execute blockchain transaction
  mint_nft(owner, token_id)
  # Add facts to MeTTa knowledge base
  add_fact(f'(NFT {token_id} Creator {owner} Ownership 100%)')`
- Similar logic for `transfer_ownership_route()`, `get_ownership_route()`, etc.

### Flow
1.  **MeTTa**: Handles knowledge representation and reasoning.
2.  **Python**: Acts as the middleware for querying MeTTa and interacting with the blockchain.
3.  **Flask**: Provides REST APIs for the frontend to interact with the backend.
4.  **Frontend**: A simple HTML/JavaScript interface for users to interact with the marketplace.

### Learning Outcomes
- MeTTa knowledge graphs for marketplaces
- Smart automation for ownership and funding
- Real-world MeTTa-Python dApps