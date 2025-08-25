# Cardano Integration Documentation

This document outlines the integration of the Cardano blockchain within the BASIX-IP-Marketplace, focusing on how it facilitates NFT operations and ownership management.

## Overview

The Cardano blockchain serves as the immutable ledger for recording critical marketplace transactions, particularly the minting and transfer of Non-Fungible Tokens (NFTs). It provides the security, decentralization, and transparency necessary for managing digital asset ownership.

## Key Blockchain Operations

The Python middleware interacts with the Cardano blockchain to perform the following core operations:

### 1. Minting NFTs

**Description:** The process of creating a new, unique NFT on the Cardano blockchain. Each NFT represents a specific intellectual property asset within the marketplace.

**Function (Conceptual):**

```python
def mint_nft(owner, token_id):
    # Logic to interact with Cardano network to mint an NFT
    # This typically involves:
    # 1. Preparing transaction metadata (e.g., token_id, asset name, policy ID)
    # 2. Building the transaction
    # 3. Signing the transaction with the appropriate keys
    # 4. Submitting the transaction to the Cardano network
    print(f"Minting NFT with ID {token_id} for owner {owner} on Cardano...")
    # Placeholder for actual Cardano minting logic
    pass
```

**Details:**
-   **Policy ID**: NFTs on Cardano are associated with a policy ID, which defines the rules for minting and burning tokens under that policy. A specific policy ID will be used for marketplace assets.
-   **Asset Name**: The `token_id` provided by the backend will be used as the asset name for the minted NFT.
-   **Metadata**: Additional metadata about the IP asset (e.g., creator, description, links to content) can be attached to the NFT transaction on Cardano.

### 2. Transferring NFT Ownership

**Description:** The process of changing the legal and on-chain owner of an NFT from one Cardano address to another.

**Function (Conceptual):**

```python
def transfer_ownership(from_address, to_address, token_id):
    # Logic to interact with Cardano network to transfer NFT ownership
    # This typically involves:
    # 1. Building a transaction to send the NFT from from_address to to_address
    # 2. Signing the transaction with the from_address's keys
    # 3. Submitting the transaction to the Cardano network
    print(f"Transferring NFT {token_id} from {from_address} to {to_address} on Cardano...")
    # Placeholder for actual Cardano transfer logic
    pass
```

**Details:**
-   **UTXO Model**: Cardano uses a UTXO (Unspent Transaction Output) model. NFT transfers involve consuming a UTXO containing the NFT from the `from_address` and creating a new UTXO with the NFT at the `to_address`.
-   **Transaction Fees**: All transactions on Cardano incur a small transaction fee, paid in ADA.

## Interaction Flow

1.  **Backend Request**: The Flask backend receives an API request (e.g., `/mint-nft`).
2.  **Python Middleware**: The Python layer calls the appropriate Cardano interaction function (`mint_nft` or `transfer_ownership`).
3.  **Cardano Node Interaction**: The Python script communicates with a Cardano node (either directly or via a library/API) to construct, sign, and submit the transaction.
4.  **Transaction Confirmation**: Once the transaction is confirmed on the Cardano blockchain, the Python middleware updates the MeTTa knowledge base to reflect the new state of ownership.

## Setup and Configuration

To enable Cardano integration, the backend environment needs access to:

-   **Cardano Node**: A running and synchronized Cardano node (mainnet, testnet, or local devnet).
-   **Cardano CLI / SDK**: Tools or libraries (e.g., `cardano-cli`, `pycardano`, `blockfrost-python`) to interact with the Cardano blockchain programmatically.
-   **Wallet Keys**: Securely managed wallet keys for signing transactions (e.g., policy keys for minting, payment keys for sending assets).

Configuration details (e.g., network magic, node socket path, API keys for Blockfrost/similar services) will be managed within the backend's configuration files.