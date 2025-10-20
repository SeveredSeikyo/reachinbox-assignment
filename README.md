# ReachOneBox

This project is a web-based email client with AI-powered features. It consists of a React frontend and a Node.js backend.

## About The Project

ReachOneBox is a modern email client that provides a clean and intuitive interface for managing your emails. It's built with a focus on speed, efficiency, and intelligence. The application allows you to connect to your existing email accounts through IMAP and provides a seamless experience for reading, searching, and managing your emails.

The key features of ReachOneBox include:

*   **Multiple Account Support**: Connect to multiple email accounts and view all your emails in one place.
*   **Fast and Powerful Search**: Leveraging the power of Elasticsearch, ReachOneBox provides a fast and powerful search experience.
*   **AI-Powered Features**: The application integrates with a generative AI model to provide features like email summarization and smart replies.
*   **Clean and Modern UI**: The user interface is built with React and designed to be clean, intuitive, and easy to use.

## Built With

This project is built with a modern tech stack, including:

**Backend:**

*   [Node.js](https://nodejs.org/)
*   [Express.js](https://expressjs.com/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Elasticsearch](https://www.elastic.co/)
*   [IMAPFlow](https://imapflow.com/)
*   [Google Generative AI](https://ai.google/)

**Frontend:**

*   [React](https://reactjs.org/)
*   [Vite](https://vitejs.dev/)
*   [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   npm
*   Docker (for Elasticsearch)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username_/ReachOneBox.git
    ```
2.  **Backend Setup**
    *   Navigate to the `backend` directory:
        ```sh
        cd backend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Start Elasticsearch using Docker:
        ```sh
        docker-compose up -d
        ```
    *   Create a `.env` file and add the necessary environment variables. You can use `.env.example` as a template. This will include credentials for the IMAP server, Elasticsearch, and the AI service.
    *   Start the backend server:
        ```sh
        npm start
        ```
3.  **Frontend Setup**
    *   Navigate to the `frontend` directory:
        ```sh
        cd frontend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Start the frontend development server:
        ```sh
        npm run dev
        ```

## Roadmap

*   [ ] Implement email composition and sending.
*   [ ] Add support for more AI-powered features, such as email categorization and prioritization.
*   [ ] Improve the user interface and user experience.
*   [ ] Add support for more email providers.
*   [ ] Write comprehensive unit and integration tests.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Thanmay Sadguru Musa - thanmaysadguru5912@gmail.com

Project Link: [https://github.com/SeveredSeikyo/reachinbox-assignment](https://github.com/SeveredSeikyo/reachinbox-assignment)