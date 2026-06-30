# EventHub

EventHub is a full-stack event management platform built with a Node.js/Express backend and a React/Vite frontend.

## Project Overview

- **Backend**: REST API powered by Express, MongoDB integration via Mongoose, authentication, ticketing, registration, attendance tracking, event management, notifications, and reporting.
- **Frontend**: React application with routing, authentication, event browsing, ticket scanning, check-in management, and analytics dashboards.

## Repository Structure

- `backend/`
  - `src/server.js` - Express server entry point.
  - `src/config/` - Database configuration.
  - `src/controllers/` - Route controllers for events, users, tickets, registrations, reports, analytics, notifications, attendance, and verification.
  - `src/routes/` - API route definitions.
  - `src/models/` - Mongoose schema models.
  - `src/middleware/` - Authentication, authorization, and error handling middleware.
  - `src/utils/` - Shared helpers and response utilities.
  - `src/docs/swagger.js` - Swagger API documentation setup.

- `frontend/`
  - `src/` - React application source.
  - `src/components/` - UI components for the dashboard, event cards, forms, scanners, tables, tickets, and notifications.
  - `src/pages/` - Application pages including login, register, events, dashboards, analytics, reports, and ticket views.
  - `src/context/` - Authentication context.
  - `src/api/axios.js` - Axios instance for API calls.
  - `src/routes/` - Route guards and protected route handling.
  - `public/` - Static assets.

## Technologies Used

- Backend: Node.js, Express, Mongoose, MongoDB, JWT authentication, Swagger documentation, QR code generation.
- Frontend: React, Vite, React Router, Axios, QR scanner integration, HTML2Canvas.

## Getting Started

### Backend

1. Open a terminal and navigate to `backend/`.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a `.env` file with required settings such as `MONGODB_URI`, `JWT_SECRET`, and any other environment variables used by the backend.
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a separate terminal and navigate to `frontend/`.
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Notes

- Ensure the backend API URL is configured correctly in the frontend Axios instance.
- If using MongoDB locally, make sure the database is running before starting the backend.
- Swagger API documentation is available via the backend when configured.

## Scripts

### Backend
- `npm start` - Run the backend server.
- `npm run dev` - Run the backend with nodemon for development.

### Frontend
- `npm run dev` - Start the frontend development server.
- `npm run build` - Build the frontend for production.
- `npm run preview` - Preview the production build.
- `npm run lint` - Run ESLint.

## License

This project does not currently specify a license.
