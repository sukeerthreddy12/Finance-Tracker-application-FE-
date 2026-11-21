# Finance Tracker — Frontend

React (Vite + TypeScript) web app for the Finance Tracker application. Talks to auth / user / expense / DS via Kong (or local gateway URL).

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Env

```env
VITE_API_BASE_URL=http://localhost:8000
```

Copy `.env.example` → `.env`. Never commit `.env`. Restart `npm run dev` after changes.

## Routes

- `/login`
- `/signup`
- `/home`
- `/profile`
