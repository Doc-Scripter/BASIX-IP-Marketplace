# API Documentation

This document details the RESTful API endpoints provided by the Flask backend for the BASIX-IP-Marketplace.

## Base URL

`http://localhost:5000` (assuming default Flask development server)

## Endpoints

### 1. Mint NFT

**Endpoint:** `/mint-nft`
**Method:** `POST`
**Description:** Mints a new NFT on the blockchain and records its ownership in the MeTTa knowledge base.

**Request Body (JSON):**

```json
{
  "owner": "<owner_address>",
  "token_id": "<unique_token_id>"
}
```

**Parameters:**
- `owner` (string, required): The blockchain address of the NFT's initial owner.
- `token_id` (string, required): A unique identifier for the NFT.

**Success Response (200 OK):**

```json
{
  "message": "NFT minted successfully",
  "token_id": "<unique_token_id>",
  "owner": "<owner_address>"
}
```

**Error Responses:**
- `400 Bad Request`: If `owner` or `token_id` are missing or invalid.
- `500 Internal Server Error`: If there's an issue with blockchain interaction or MeTTa update.

### 2. Transfer Ownership

**Endpoint:** `/transfer-ownership`
**Method:** `POST`
**Description:** Transfers the ownership of an existing NFT on the blockchain and updates the ownership record in the MeTTa knowledge base.

**Request Body (JSON):**

```json
{
  "from_address": "<current_owner_address>",
  "to_address": "<new_owner_address>",
  "token_id": "<unique_token_id>"
}
```

**Parameters:**
- `from_address` (string, required): The current owner's blockchain address.
- `to_address` (string, required): The new owner's blockchain address.
- `token_id` (string, required): The unique identifier of the NFT to transfer.

**Success Response (200 OK):**

```json
{
  "message": "NFT ownership transferred successfully",
  "token_id": "<unique_token_id>",
  "new_owner": "<new_owner_address>"
}
```

**Error Responses:**
- `400 Bad Request`: If any required parameters are missing or invalid, or if `from_address` is not the current owner.
- `500 Internal Server Error`: If there's an issue with blockchain interaction or MeTTa update.

### 3. Get Ownership

**Endpoint:** `/get-ownership/<token_id>`
**Method:** `GET`
**Description:** Retrieves the current owner of a specified NFT from the MeTTa knowledge base.

**URL Parameters:**
- `token_id` (string, required): The unique identifier of the NFT.

**Success Response (200 OK):**

```json
{
  "token_id": "<unique_token_id>",
  "owner": "<current_owner_address>",
  "percentage": "<ownership_percentage>" (e.g., "100%")
}
```

**Error Responses:**
- `404 Not Found`: If the `token_id` does not exist in the MeTTa knowledge base.
- `500 Internal Server Error`: If there's an issue querying the MeTTa knowledge base.