# MeTTa Documentation

This document details the role of MeTTa (Meta-Type Theory) in the BASIX-IP-Marketplace, focusing on its use for knowledge representation and autonomous agent functions.

## Overview

MeTTa serves as the core knowledge base and reasoning engine for the marketplace. It allows for the flexible and dynamic representation of complex relationships between creators, projects, assets, and their properties. Furthermore, it enables the implementation of autonomous agent functions that automate key marketplace operations based on defined rules and triggers.

## Knowledge Structure in MeTTa

MeTTa's atom-based representation is used to define and manage various entities and their relationships. This includes:

-   **Creators**: Individuals or entities that produce intellectual property.
-   **Projects**: Collections of intellectual property assets.
-   **Assets**: The digital or phygital items being traded (e.g., NFTs, videos, tickets).
-   **Ownership**: The distribution of ownership percentages among creators.
-   **Asset Type**: Classification of assets (e.g., NFT, video, ticket).
-   **Utility**: The rights or benefits associated with an asset (e.g., streaming rights, revenue share, access).
-   **Token Distribution & Staking**: Modeling how tokens are distributed and staked within the ecosystem.

### Sample Knowledge Representations

#### NFTs and their Creators

MeTTa atoms can represent the ownership structure of an NFT among multiple creators:

```metta
(NFT Artwork1 Creator Alice Ownership 50%)
(NFT Artwork1 Creator Bob Ownership 30%)
(NFT Artwork1 Creator Charlie Ownership 20%)
```

This indicates that `Artwork1` is an NFT, and its creation is attributed to Alice (50% ownership), Bob (30%), and Charlie (20%).

#### NFT Utility

MeTTa can also capture the utility associated with an NFT:

```metta
(Alice BeyondTheCode NFT_001 (stream NFT_001 BeyondTheCode))
```

This atom signifies that Alice owns `NFT_001` (presumably from the `BeyondTheCode` project) and that this NFT grants the right to stream `NFT_001` within the `BeyondTheCode` context.

#### Phygital Assets

For assets that have both a physical and digital component, MeTTa can link them:

```metta
(PhigitalAsset House1 NFT Token1 Location Mumbai)
(PhigitalAsset Car1 NFT Token2 Location Delhi)
```

These atoms represent `House1` and `Car1` as phygital assets, each linked to a specific NFT token (`Token1`, `Token2`) and associated with a physical location.

## Autonomous Agent Functions

MeTTa's reasoning capabilities allow for the implementation of autonomous agents that can execute logic based on the knowledge base. This includes automating processes like funding and royalty payments and triggering smart contracts.

### Sample Autonomous Agent Functions

#### Setting, Getting, and Approving Ownership

MeTTa rules can define how ownership is managed and approved:

```metta
(= (getOwnerShip $nft)
  (match $space (...)
    ($creator $percentage)))

(= (setOwnerShip $nft $newOwner)
  (addAtom $space ($nft $newOwner)))

(= (getTreshold $asset)
  (match $space (...)
    $treshold))

(= (checkFundingApproval $asset $funding)
  Approved/Rejected)
```

-   `(getOwnerShip $nft)`: A rule to retrieve the creator and their ownership percentage for a given NFT.
-   `(setOwnerShip $nft $newOwner)`: A rule to update the owner of an NFT. This would typically be triggered after a blockchain transaction confirms the ownership transfer.
-   `(getTreshold $asset)`: A rule to retrieve a predefined threshold for an asset, potentially used for royalty payments or funding approvals.
-   `(checkFundingApproval $asset $funding)`: A rule that evaluates whether a given funding amount for an asset meets the approval criteria, returning `Approved` or `Rejected`.

## Python Integration with MeTTa

The Python middleware acts as the bridge between the MeTTa knowledge base and other components like the blockchain and the Flask backend. It allows for dynamic querying of MeTTa and updating the knowledge base based on external events.

### Example: Updating Ownership in MeTTa

After a successful blockchain transaction (e.g., `transfer_ownership`), the Python layer updates the MeTTa knowledge base:

```python
def update_ownership(nft, new_owner):
    metta.run(f'(setOwnership {nft} {new_owner})')
```

This function executes a MeTTa command to assert the new ownership fact within the knowledge graph, ensuring that MeTTa's view of ownership is synchronized with the blockchain.

## Setup and Usage

To utilize MeTTa:

-   **MeTTa Environment**: Ensure a MeTTa interpreter or runtime is available and accessible by the Python middleware.
-   **Knowledge Base Initialization**: The initial knowledge base can be loaded from a file or dynamically populated.
-   **Python Bindings**: Use appropriate Python libraries or methods to interact with MeTTa (e.g., `hyperon` library if available, or a custom interface for running MeTTa commands and parsing results).

MeTTa's flexibility allows for continuous expansion of the knowledge base and the addition of more sophisticated autonomous agent functions as the marketplace evolves.