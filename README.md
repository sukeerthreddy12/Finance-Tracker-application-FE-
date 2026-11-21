# Finance Tracker — Frontend

React (Vite + TypeScript) web app for Finance Tracker. Users sign up/log in, view profile and spends, and hit **one Kong gateway base URL** — never individual service IPs.

Part of the Finance Tracker microservices app.

**System map:** see [ARCHITECTURE.md in Auth](https://github.com/sukeerthreddy12/FinanceTrackerApplication/blob/main/ARCHITECTURE.md)

## What this app does

- Login / signup / token refresh against Auth (`/auth/v1/...`)
- Session check via `/auth/v1/ping` with Bearer token
- Spends UI calling Expense APIs through Kong (`/expense/v1/...`)
- Stores access/refresh tokens in `localStorage`
- Configures backend only via `VITE_API_BASE_URL` (Kong or local gateway)

## Routes

| Path | Screen |
|------|--------|
| `/login` | Login |
| `/signup` | Sign up |
| `/home` | Home |
| `/profile` | Profile |
| (spends / insights pages) | Expense views |

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

Point this at Kong (or your ALB in front of Kong) in deployed environments. Never commit `.env`.

## Related repos

- [Auth + Architecture](https://github.com/sukeerthreddy12/FinanceTrackerApplication)
- [User](https://github.com/sukeerthreddy12/FinanceTrackerUserService) · [Expense](https://github.com/sukeerthreddy12/FinanceTrackerExpenseService) · [DS](https://github.com/sukeerthreddy12/FinanceTrackerDsService)
