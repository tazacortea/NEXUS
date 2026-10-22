# NEXUS

NEXUS is a full-stack wellness-insights web app for a bootcamp final project. It turns a short lifestyle check-in into transparent, non-medical insights, practical recommendations, and a small progress dashboard.

> **Important:** NEXUS is an educational wellness tool. It does not diagnose, treat, or replace advice from a qualified health professional.

## MVP journey

```text
Register / Log in → Complete assessment → Receive score and suggestions
                                               ↓
                                      Log daily check-ins
                                               ↓
                                  Review dashboard and progress
```

## Stack

| Layer | Technology | Why it is here |
| --- | --- | --- |
| Frontend | React, Vite, Tailwind CSS | Fast, responsive component UI |
| Backend | Node.js, Express | REST API and business logic |
| Data | MongoDB, Mongoose | Persistent users, assessments, progress entries |
| Security | bcryptjs, JWT, Helmet | Hashed passwords, protected routes, safer HTTP headers |

## Start locally

1. Install [Node.js LTS](https://nodejs.org/) and make sure MongoDB is running locally, or create a free MongoDB Atlas database.
2. In `server`, copy `.env.example` to `.env` and fill in `MONGODB_URI` and `JWT_SECRET`.
3. From this `nexus` folder, run:

```bash
npm install
npm run install:all
npm run dev
```

4. Open `http://localhost:5173`.

## Useful commands

```bash
npm run test       # Tests the scoring engine without requiring MongoDB
npm run build      # Produces a production frontend build
```

## Folder map

```text
nexus/
├── client/               # React/Vite interface
│   └── src/
│       ├── components/   # Reusable page shell and small UI blocks
│       ├── context/      # Authentication state shared by the app
│       └── pages/        # Route-level screens
└── server/               # Express API
    └── src/
        ├── controllers/  # Request/response work
        ├── middleware/   # JWT protection and error handling
        ├── models/       # Mongoose database schemas
        └── services/     # The pure, testable wellness scoring engine
```

## API overview

| Method | Route | Purpose | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create an account | No |
| POST | `/api/auth/login` | Get a JWT session | No |
| GET | `/api/auth/me` | Restore current user | Yes |
| GET | `/api/assessments/questions` | Fetch assessment questions | No |
| POST | `/api/assessments` | Score and save assessment | Yes |
| GET | `/api/assessments/latest` | Read last assessment | Yes |
| GET/POST | `/api/progress` | Read or save check-ins | Yes |
| GET | `/api/dashboard` | Fetch summary data | Yes |
