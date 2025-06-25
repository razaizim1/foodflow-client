# Food Share Client Site

This is a client-side application for a food sharing platform, allowing users to browse available food items, add their own food for donation, request food, and manage their donations.

## Features

*   **User Authentication**: Secure user login and registration.
*   **Browse Available Foods**: View a list of available food items with details like quantity, pickup location, and expiry date.
*   **Add Food**: Users can add their own food items for donation, specifying details like name, image, quantity, pickup location, and expiry.
*   **Request Food**: Authenticated users can request available food items.
*   **Manage My Foods**: Users can view, update, and delete the food items they have donated.
*   **Responsive Design**: A user-friendly interface that adapts to various screen sizes.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool for modern web projects.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **React Router**: For declarative routing in the application.
*   **TanStack Query (React Query)**: For efficient data fetching, caching, and synchronization with the server.
*   **SweetAlert2**: For beautiful, responsive, and customizable alert messages.
*   **Moment.js**: A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
*   **Firebase**: For user authentication.

## Setup and Installation

Follow these steps to set up the project locally:

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd b11a11-client-site
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root of the `b11a11-client-site` directory and add your Firebase configuration (if applicable) and any other client-side environment variables.

    ```
    # Example .env content (replace with your actual Firebase config)
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_PROJECT_ID=your_firebase_project_id
    VITE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_APP_ID=your_firebase_app_id
    ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

This application can be deployed to platforms like Vercel or Firebase Hosting. Ensure that:
*   The API endpoints in `src/api/myFoodApi.js` and other components point to your deployed server URL (e.g., `https://your-server-app.vercel.app`).
*   Your server's CORS policy (in `b11a11-server-site/index.js`) allows requests from your deployed client-side URL.

## License

This project is licensed under the MIT License.
