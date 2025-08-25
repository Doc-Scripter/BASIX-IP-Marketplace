# Backend Documentation

This document provides a detailed overview of the Flask backend for the BASIX-IP-Marketplace.

## Overview

The Flask backend serves as the central hub for the marketplace, mediating interactions between the frontend, the MeTTa knowledge base, and the Cardano blockchain. It exposes a set of RESTful APIs that allow the frontend to trigger core marketplace functionalities such as NFT minting, ownership transfer, and data retrieval.

## Technologies Used

-   **Flask**: A lightweight Python web framework used for building the RESTful APIs.
-   **Python**: The primary programming language for the backend logic, including integration with MeTTa and blockchain functionalities.
-   **MeTTa**: Used for knowledge representation and reasoning, storing and managing information about NFTs, ownership, and other marketplace assets.
-   **Cardano Blockchain**: The decentralized ledger for recording NFT transactions and ownership.

## Project Structure (Conceptual)

```
backend/
├── app.py             # Main Flask application, defines routes and orchestrates calls
├── blockchain.py      # Handles interactions with the Cardano blockchain (minting, transfer, etc.)
├── metta_integration.py # Manages communication with the MeTTa knowledge base (add facts, query, etc.)
├── config.py          # Configuration settings (e.g., blockchain network, MeTTa server address)
└── utils.py           # Utility functions
```

## Key Modules and Their Responsibilities

### `app.py`

This is the main entry point for the Flask application. It initializes the Flask app, defines the API routes, and orchestrates calls to the `blockchain.py` and `metta_integration.py` modules to fulfill API requests.

**Example (from instructions.md):**

```python
@app.route('/mint-nft', methods=['POST'])
def mint_nft_route():
    owner = request.json.get('owner')
    token_id = request.json.get('token_id')

    # Execute blockchain transaction
    blockchain.mint_nft(owner, token_id)

    # Add facts to MeTTa knowledge base
    metta_integration.add_fact(f'(NFT {token_id} Creator {owner} Ownership 100%)')

    return jsonify({"message": "NFT minted successfully", "token_id": token_id, "owner": owner}), 200
```

### `blockchain.py`

This module encapsulates all logic related to interacting with the Cardano blockchain. It provides functions for:

-   **`mint_nft(owner, token_id)`**: Mints a new NFT on the blockchain, assigning initial ownership.
-   **`transfer_ownership(from_address, to_address, token_id)`**: Facilitates the transfer of an NFT's ownership from one address to another on the blockchain.
-   *(Potentially other functions like `get_balance`, `get_transaction_status`)*

### `metta_integration.py`

This module is responsible for all communication with the MeTTa knowledge base. It provides functions to:

-   **`add_fact(fact)`**: Adds new facts or knowledge atoms to the MeTTa space (e.g., `(NFT {token_id} Creator {owner} Ownership 100%)`).
-   **`query_metta(query)`**: Queries the MeTTa knowledge base to retrieve information (e.g., `(getOwnerShip $nft)`).
-   **`update_ownership(nft, new_owner)`**: Specifically updates ownership information in MeTTa after a blockchain transaction.

**Example (from instructions.md):**

```python
def update_ownership(nft, new_owner):
    metta.run(f'(setOwnership {nft} {new_owner})')
```

## Setup and Running

To set up and run the Flask backend:

1.  **Prerequisites**: Ensure Python 3.x, Flask, and any necessary MeTTa/Cardano client libraries are installed.
2.  **Configuration**: Update `config.py` with your specific blockchain network details and MeTTa server endpoint.
3.  **Installation**: Install Python dependencies (e.g., `pip install Flask`).
4.  **Run**: Execute `python app.py` to start the Flask development server.