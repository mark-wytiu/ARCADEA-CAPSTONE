# ARCADEA - Game Library App

ARCADEA is a game library app designed for passionate gamers who crave variety and organization.

## Getting Started

### Prerequisites

-   Node.js (v14 or newer)
-   npm or yarn
-   Git

### Installation and Setup

1. Clone the frontend repository:

```
git clone https://github.com/mark-wytiu/ARCADEA-CAPSTONE-frontend.git
cd ARCADEA-CAPSTONE-frontend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory with:

```
REACT_APP_API_BASE_URL=http://localhost:5050
```

### Running the Application

#### Option 1: Run Frontend and Backend Separately

**To run the backend:**

```
git clone https://github.com/mark-wytiu/ARCADEA-CAPSTONE-backend.git
cd ARCADEA-CAPSTONE-backend
npm install
npm start
```

**To run the frontend:**

```
cd ARCADEA-CAPSTONE-frontend
npm start
```

#### Option 2: Using the Development Script (macOS)

We've included a convenient script that launches both frontend and backend servers at once:

1. Make the script executable:

```
chmod +x dev.sh
```

2. Run the script:

```
./dev.sh
```

This will:

-   Clone the backend repository if it doesn't exist
-   Start the backend server in a separate terminal window
-   Start the frontend development server in the current terminal

### Accessing the App

Once both servers are running:

-   The frontend will be available at: http://localhost:3000
-   The backend API will be available at: http://localhost:5050

## Features

-   Browse and search for games
-   View game details
-   Add new games to the library
-   Modern, responsive user interface

## Tech Stack

-   React.js
-   Material UI
-   Express.js
-   MySQL
-   Axios

## Project Structure

-   `/src/components`: React components
-   `/src/pages`: Page components
-   `/src/services`: API service layer
-   `/src/assets`: Static assets (images, styles)

## Contact

Mark Wytiu - [GitHub](https://github.com/mark-wytiu)
