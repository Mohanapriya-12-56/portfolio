# Personal Portfolio Website

A modern full-stack portfolio project built with Tailwind CSS, Vite, Node.js, Express, and MongoDB.

## Project Structure

- `frontend/` - Tailwind-powered static frontend with responsive portfolio pages.
- `backend/` - Express API for handling contact form submissions and persisting them to MongoDB.

## Features

- Hero section with profile visuals and CTA buttons
- About section with career summary
- Skills section with animated cards
- Projects section with GitHub and demo buttons
- Experience section for education and work highlights
- Contact section with form validation and backend API submission
- Dark mode toggle and sticky navbar
- Glassmorphism UI with responsive layouts

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Then edit .env to add your MongoDB connection
npm run dev
```

### Environment Variables

Create `backend/.env` using `backend/.env.example`:

```text
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Access the app

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/contact`

## Notes

- The contact form sends data to the backend and stores messages in MongoDB.
- The frontend uses Axios for API calls and validates all required fields.
- The project is structured for development and production builds with Vite.
