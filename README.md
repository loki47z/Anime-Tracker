# Anime Tracker Web App

## 📝 Description
The Anime Tracker Web App is a simple web application designed to help users search for anime and manage their personal watch lists. Users can register, log in, search for anime titles using the Jikan API, and theoretically add them to their personalized lists (the "Add to List" functionality forms are present in the provided EJS).

## ✨ Features
* **User Authentication:** Secure user registration, login, and logout capabilities using `express-session`.
* **Protected Routes:** Access to certain pages (e.g., Dashboard) is restricted to authenticated users.
* **Anime Search:** Search for anime titles using the comprehensive Jikan API (MyAnimeList API).
* **Dynamic Results:** Displays search results including anime titles, images, and genre information.
* **Personal Watchlist Integration:** Forms to add searched anime to a user's `Watching`, `Completed`, or `Plan to Watch` list.
* **Responsive Design:** (Basic responsiveness based on CSS, can be further enhanced).

## 🚀 Technologies Used
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Session Management:** `express-session`
* **API Interaction:** `axios`
* **Templating Engine:** EJS
* **Environment Variables:** `dotenv`

## ⚙️ Setup and Installation

### Prerequisites
* Node.js (LTS version recommended)
* npm (Node Package Manager)
* MongoDB (ensure your MongoDB server is running)

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd anime-tracker-web-app # Replace with your actual project directory name
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    This will install `express`, `mongoose`, `axios`, `express-session`, and `dotenv`.

3.  **Create `.env` file:**
    In the root of your project directory, create a file named `.env` and add the following environment variables:

    ```env
    PORT=3000
    MONG_URI="mongodb://localhost:27017/your_anime_tracker_db" # Replace with your MongoDB connection string
    SESSION_SECRET="a_very_long_and_random_string_for_your_session_secret"
    NODE_ENV=development # Set to 'production' when deploying for 'secure' cookie flag
    ```
    * **`PORT`**: The port your server will run on.
    * **`MONG_URI`**: Your MongoDB connection URI.
    * **`SESSION_SECRET`**: A strong, random string essential for signing session cookies. **Keep this secret and never hardcode it directly in your code!**

4.  **Run the Application:**
    ```bash
    node app.js
    ```
    The server should start, and you'll see a message like "Database connected and server running on Port 3000" (or your specified port).

## 📚 Usage

1.  **Access the App:** Open your web browser and navigate to `http://localhost:3000` (or your configured port).

2.  **Register:**
    * Go to `http://localhost:3000/register`.
    * Create a new username and password.

3.  **Login:**
    * Go to `http://localhost:3000/login`.
    * Enter your registered credentials to log in.

4.  **Search Anime:**
    * Navigate to the "Search Anime" link in the navigation bar.
    * Enter an anime title in the search box and press Enter or click "Search".
    * Results from the Jikan API will be displayed.

5.  **Dashboard (Protected):**
    * After logging in, you can access your dashboard via `http://localhost:3000/dashboard`. This page is only accessible to logged-in users.

6.  **Logout:**
    * Click the "Logout" link in the navigation bar to end your session.

## ⚠️ Security Note on Passwords

**IMPORTANT:** The current implementation of password handling in this application **does not use password hashing (like bcrypt)**. This means passwords are stored in the database in a directly readable format. **This approach is highly insecure and is NOT recommended for production environments.**

## 📂 Project Structure

.
├── models/
│   └── User.js          # Mongoose schema for User and embedded Anime data
├── public/
│   ├── css/
│   │   └── index.css    # Stylesheets for the application
│   └── # other static assets (e.g., images, js)
├── routes/
│   └── route.js         # Defines all application routes (login, search, dashboard, etc.)
├── views/
│   ├── dashboard.ejs    # User dashboard page
│   ├── index.ejs        # Home page
│   ├── login.ejs        # User login form
│   ├── register.ejs     # User registration form
│   └── search.ejs       # Anime search results page
│   └── partials/        # Reusable EJS partials (header, footer)
│       ├── footer.ejs
│       └── header.ejs
├── .env                 # Environment variables
├── app.js               # Main Express application file
├── package.json         # Project metadata and dependencies
└── README.md            # This file

## 🙏 Acknowledgements
* [Jikan API](https://jikan.moe/) for providing anime data.
