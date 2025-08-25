# Backend Documentation

This document provides a detailed overview of the Flask backend for the BASIX-IP-Marketplace.

## Overview

The Flask backend serves as the API layer for the BASIX-IP-Marketplace, primarily focusing on serving the React frontend and managing user authentication and data persistence. It provides RESTful APIs for user registration, login, and other core functionalities.

## Technologies Used

-   **Flask**: A lightweight Python web framework used for building the RESTful APIs.
-   **Python**: The primary programming language for the backend logic.
-   **Flask-SQLAlchemy**: An ORM for interacting with the database (SQLite).
-   **Flask-Bcrypt**: For secure password hashing.
-   **Flask-Login**: For managing user sessions and authentication.
-   **SQLite**: A file-based SQL database for local development and data storage.

## Project Structure

```
backend/
├── app.py             # Main Flask application, defines routes, initializes extensions
├── config.py          # Configuration settings (e.g., database URI, secret key)
├── models.py          # Defines database models (e.g., User model)
└── requirements.txt   # Lists Python dependencies
```

## Key Modules and Their Responsibilities

### `app.py`

This is the main entry point for the Flask application. It initializes the Flask app, configures it, sets up Flask-SQLAlchemy and Flask-Login, and defines the API routes for user authentication and serving the React frontend.

### `config.py`

This module holds the application's configuration settings, such as the `SECRET_KEY` for Flask sessions and the `SQLALCHEMY_DATABASE_URI` for connecting to the SQLite database.

### `models.py`

This module defines the SQLAlchemy database models. Currently, it includes the `User` model, which represents users in the system and includes methods for password hashing and checking.

## Setup and Running

To set up and run the Flask backend:

1.  **Prerequisites**: Ensure Python 3.x is installed.
2.  **Installation**: Navigate to the `backend/` directory and install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Configuration**: Ensure `config.py` is properly configured (e.g., `SQLALCHEMY_DATABASE_URI` points to your desired SQLite database file).
4.  **Run**: From the project root, execute the Flask application using the Makefile:
    ```bash
    make backend
    ```
    This will start the Flask development server, typically on `http://localhost:5000`.