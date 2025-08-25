# API Documentation

This document details the RESTful API endpoints provided by the Flask backend for the BASIX-IP-Marketplace.

## Base URL

`http://localhost:5000` (default Flask development server)

## Endpoints

### 1. User Registration

**Endpoint:** `/api/register`
**Method:** `POST`
**Description:** Registers a new user with a unique username and email.

**Request Body (JSON):**

```

### 4. IP Creation

**Endpoint:** `/api/ip/create`
**Method:** `POST`
**Description:** Allows a logged-in user to create and list a new IP asset for sale.

**Authentication:** Required (user must be logged in).

**Request Body (JSON):**

```json
{
  "title": "<string>",
  "description": "<string>",
  "price": "<number>",
  "category": "<string>"
}
```

**Parameters:**
- `title` (string, required): The title of the IP asset.
- `description` (string, required): A detailed description of the IP asset.
- `price` (number, required): The price of the IP asset in ADA.
- `category` (string, required): The category of the IP asset (e.g., "Software", "Design", "Music").

**Success Response (201 Created):**

```json
{
  "message": "IP asset created successfully",
  "ip_asset": {
    "id": "<integer>",
    "title": "<string>",
    "description": "<string>",
    "price": "<number>",
    "category": "<string>",
    "owner_id": "<integer>"
  }
}
```

**Error Responses:**
- `400 Bad Request`: If required fields are missing or invalid.
- `401 Unauthorized`: If the user is not logged in.

### 5. List All IP Assets

**Endpoint:** `/api/ip/list`
**Method:** `GET`
**Description:** Retrieves a list of all available IP assets.

**Authentication:** Optional.

**Success Response (200 OK):**

```json
[
  {
    "id": "<integer>",
    "title": "<string>",
    "description": "<string>",
    "price": "<number>",
    "category": "<string>",
    "owner_id": "<integer>"
  },
  // ... more IP assets
]
```

**Error Responses:**
- `500 Internal Server Error`: If there's an issue retrieving IP assets.

### 6. Purchase IP Asset

**Endpoint:** `/api/ip/purchase/<int:ip_id>`
**Method:** `POST`
**Description:** Allows a logged-in user to purchase an IP asset.

**Authentication:** Required (user must be logged in).

**Parameters:**
- `ip_id` (integer, required): The ID of the IP asset to purchase.

**Success Response (200 OK):**

```json
{
  "message": "IP asset purchased successfully",
  "transaction_id": "<string>"
}
```

**Error Responses:**
- `400 Bad Request`: If the `ip_id` is invalid.
- `401 Unauthorized`: If the user is not logged in.
- `404 Not Found`: If the IP asset with the given ID does not exist.
- `409 Conflict`: If the user tries to purchase their own IP asset or if the asset is already sold.
- `500 Internal Server Error`: If there's an issue processing the purchase.

### 7. Protected Route Example

**Endpoint:** `/api/protected`
**Method:** `GET`
**Description:** An example route that requires user authentication to access.

**Authentication:** Required (user must be logged in).

**Success Response (200 OK):**

```json
{
  "message": "Hello, <username>! You are authenticated."
}
```

**Error Responses:**
- `401 Unauthorized`: If the user is not logged in.
json
{
  "username": "<string>",
  "email": "<string>",
  "password": "<string>"
}
```

**Parameters:**
- `username` (string, required): Desired username for the new user.
- `email` (string, required): User's email address.
- `password` (string, required): User's chosen password.

**Success Response (201 Created):**

```json
{
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400 Bad Request`: If `username`, `email`, or `password` are missing.
- `409 Conflict`: If the `username` or `email` already exists.

### 2. User Login

**Endpoint:** `/api/login`
**Method:** `POST`
**Description:** Authenticates a user and establishes a session.

**Request Body (JSON):**

```json
{
  "username": "<string>",
  "password": "<string>"
}
```

**Parameters:**
- `username` (string, required): User's username.
- `password` (string, required): User's password.

**Success Response (200 OK):**

```json
{
  "message": "Logged in successfully",
  "user": {
    "username": "<string>",
    "email": "<string>"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: If the username or password is invalid.

### 3. User Logout

**Endpoint:** `/api/logout`
**Method:** `POST`
**Description:** Logs out the current user, ending their session.

**Authentication:** Required (user must be logged in).

**Success Response (200 OK):**

```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: If the user is not logged in.

### 4. Protected Route Example

**Endpoint:** `/api/protected`
**Method:** `GET`
**Description:** An example route that requires user authentication to access.

**Authentication:** Required (user must be logged in).

**Success Response (200 OK):**

```json
{
  "message": "Hello, <username>! You are authenticated."
}
```

**Error Responses:**
- `401 Unauthorized`: If the user is not logged in.