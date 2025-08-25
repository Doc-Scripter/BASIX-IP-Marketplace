# Frontend Documentation

This document provides an overview of the React.js frontend for the BASIX-IP-Marketplace.

## Overview

The frontend is a single-page application (SPA) built with React.js, providing a user-friendly interface for interacting with the marketplace. It communicates with the Flask backend via RESTful API calls to perform actions such as minting NFTs, transferring ownership, and displaying asset information.

## Technologies Used

-   **React.js**: A JavaScript library for building user interfaces.
-   **JavaScript/TypeScript**: The primary programming language for frontend development.
-   **HTML/CSS**: For structuring and styling the web pages.
-   **Axios/Fetch API**: For making HTTP requests to the Flask backend.

## Project Structure (Conceptual)

```
frontend/
├── public/          # Static assets (index.html, favicon.ico, etc.)
├── src/
│   ├── components/  # Reusable UI components (e.g., Button, Card, Modal)
│   ├── pages/       # Top-level components representing different views/routes (e.g., HomePage, Dashboard, NFTDetail)
│   ├── services/    # Functions for interacting with the backend API
│   ├── context/     # React Context for global state management (e.g., AuthContext, MarketplaceContext)
│   ├── hooks/       # Custom React hooks for reusable logic
│   ├── App.js       # Main application component, defines routing
│   ├── index.js     # Entry point of the React application
│   └── styles/      # Global styles or theme definitions
├── package.json     # Project dependencies and scripts
└── README.md        # Frontend-specific README
```

## Key Areas and Functionalities

### Components

Components are the building blocks of the UI. They are designed to be reusable and encapsulate their own logic and styling. Examples might include:

-   **`NFTCard`**: Displays details of an individual NFT.
-   **`MintForm`**: A form for users to input details for minting a new NFT.
-   **`TransferForm`**: A form for initiating NFT ownership transfers.
-   **`Header` / `Footer`**: Common layout components.

### Pages

Pages are responsible for composing various components to form complete views. They often handle data fetching and state management specific to that view.

-   **`HomePage`**: Landing page, potentially displaying featured NFTs or marketplace statistics.
-   **`Dashboard`**: User-specific view showing owned NFTs, transaction history, etc.
-   **`NFTDetail`**: Displays comprehensive information about a single NFT, including its history and current owner.

### Services (API Integration)

This directory contains functions that abstract the API calls to the Flask backend. This separation ensures that UI components do not directly handle HTTP requests, making the code cleaner and easier to maintain.

**Example (conceptual):**

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Or from environment variables

export const mintNft = async (owner, tokenId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mint-nft`, { owner, token_id: tokenId });
    return response.data;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};

export const transferOwnership = async (fromAddress, toAddress, tokenId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transfer-ownership`, { from_address: fromAddress, to_address: toAddress, token_id: tokenId });
    return response.data;
  } catch (error) {
    console.error('Error transferring ownership:', error);
    throw error;
  }
};

export const getOwnership = async (tokenId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-ownership/${tokenId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting ownership:', error);
    throw error;
  }
};
```

### State Management

React Context API or a state management library (e.g., Redux, Zustand, Recoil) can be used to manage global application state, such as user authentication status, marketplace data, or theme settings.

## Setup and Running

To set up and run the React.js frontend:

1.  **Prerequisites**: Ensure Node.js and npm (or yarn) are installed.
2.  **Installation**: Navigate to the `frontend/` directory and run `npm install` (or `yarn install`) to install dependencies.
3.  **Run**: Execute `npm start` (or `yarn start`) to start the development server. The application will typically open in your browser at `http://localhost:3000`.