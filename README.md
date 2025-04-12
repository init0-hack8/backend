# Express.js Backend

A basic Express.js backend server with a modular structure and Firebase integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your environment variables:
```
PORT=5000
```

3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web icon (</>)
   - Register your app with a nickname
   - Copy the Firebase configuration object
   - Save it as `firebase_key.json` in the backend root directory

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /`: Welcome message
- `GET /api/health`: Health check endpoint

## Project Structure

```
backend/
├── node_modules/
├── routes/
│   └── index.js
├── controller/
│   └── firebaseSetting.js
├── utils/
│   └── jsonLoader.js
├── .env
├── .gitignore
├── firebase_key.json
├── package.json
├── README.md
└── server.js
``` 