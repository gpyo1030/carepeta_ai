# CarePet AI Blueprint

## Overview

CarePet AI is a web-based application designed to integrate with Google AI services. This blueprint outlines the features, design, and implementation plan for the application.

# CarePet AI Blueprint

## Overview

CarePet AI is a web-based application designed to integrate with Google AI services. This blueprint outlines the features, design, and implementation plan for the application.

## Implemented Features

*   **Initial Project Setup**: Basic HTML, CSS, and JavaScript files.
*   **Visual & UX Refresh**: Enhanced the visual design with a modern color scheme, improved layout, and responsive typography.
*   **Node.js Backend Server**: Created a backend server using Express.js to handle business logic securely.
*   **CORS & Environment Variable Support**: Integrated `cors` and `dotenv` for secure and flexible server configuration.

## Current Plan: Secure Server-Side Architecture

### Objective

Refactor the application to use a backend-for-frontend (BFF) pattern. This moves the Google AI API calls from the client to a secure backend server, ensuring the API key is never exposed to end-users. This provides a secure and scalable architecture for a public-facing web service.

### New Architecture

1.  **Client-Side (Browser)**: The user interacts with the UI. When they request AI advice, the frontend sends a request to our own backend server, not directly to Google.
2.  **Backend Server (Node.js)**:
    *   A new `server.js` file contains an Express.js application.
    *   It exposes a `/api/get-advice` endpoint that receives requests from the client.
    *   The secret `GOOGLE_API_KEY` is loaded securely from a `.env` file into the server's environment variables.
    *   The server receives the user's prompt, adds the secret API key, and makes the actual API call to the Google Generative AI service.
3.  **Secure Communication**: The backend server proxies the response from Google back to the client. The API key never leaves the secure server environment.
4.  **Configuration**:
    *   `package.json` manages all backend dependencies (`express`, `@google/generative-ai`, `dotenv`, `cors`).
    *   `.gitignore` prevents `node_modules` and the `.env` file from being committed.
    *   `.env.example` provides a template for local development setup.
