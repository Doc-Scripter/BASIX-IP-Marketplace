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

```json
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