# Backend

This is the backend for ReachOneBox, a web-based email client with AI-powered features.

## Getting Started

To get the backend up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   npm
*   Docker (for Elasticsearch)

### Installation

1.  **Navigate to the `backend` directory**
    ```sh
    cd backend
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Start Elasticsearch using Docker**
    ```sh
    docker-compose up -d
    ```
4.  **Create a `.env` file**

    Create a `.env` file in the `backend` directory and add the necessary environment variables. You can use `.env.example` as a template. This will include credentials for the IMAP server, Elasticsearch, and the AI service.

5.  **Start the server**
    ```sh
    npm start
    ```

    The backend server will be available at `http://localhost:5000`.
