# Minh Dien Portfolio Monorepo

Portfolio monorepo with two deployable apps:

- `frontend/`: React + Vite portfolio site
- `backend/`: Express API for contact submissions and visitor tracking

This repository is structured for `1 Git repository + 2 Vercel projects`.

## Stack

- Frontend: React 19, Vite, Tailwind CSS v4, Framer Motion
- Backend: Node.js, Express, PostgreSQL (Neon), Nodemailer
- Deployment: Vercel

## Project Structure

```text
.
├─ frontend/
│  ├─ package.json
│  ├─ vercel.json
│  └─ src/
├─ backend/
│  ├─ package.json
│  ├─ vercel.json
│  ├─ schema.sql
│  └─ src/
├─ eslint.config.js
├─ package.json
└─ package-lock.json
```

## Local Development

### Prerequisites

- Node.js 22.x
- npm 10+
- Neon PostgreSQL connection string
- SMTP credentials for contact email delivery

### Install

From the repository root:

```bash
npm install
```

### Environment Files

Backend:

```bash
cp backend/.env.example backend/.env
```

Set at least:

- `DATABASE_URL`
- `APP_ORIGIN=http://localhost:5173`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `CONTACT_TO_EMAIL`

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

For local development, leave `VITE_API_BASE_URL` empty so Vite can proxy `/api` to the backend.

### Run

Start both apps from the root:

```bash
npm run dev
```

Default local ports:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

Useful commands:

```bash
npm run dev:frontend
npm run dev:backend
npm run build
npm run preview
npm run start
npm run lint
```

Notes:

- `npm run dev` runs two separate servers.
- `npm run preview` previews the frontend build only.
- `npm run start` starts the backend API only.
- The backend no longer serves the frontend build; this matches the Vercel deployment model.

## Runtime Flow

### Frontend

- Vite serves the React app from `frontend/`
- The client requests `/api/*`
- In local development, Vite proxies `/api` to `http://localhost:3001`
- In production, `VITE_API_BASE_URL` should point to your deployed backend domain

### Backend

- Express exposes `/api/contact`, `/api/visits`, `/api/visits/summary`, and `/api/health`
- Swagger UI is available at `/api/docs`
- The raw OpenAPI document is available at `/api/openapi.json`
- Contact submissions are stored in Neon and then sent by SMTP
- Visitor tracking stores IP-derived geo data and parsed device metadata in PostgreSQL

## Vercel Deployment

Deploy this monorepo as two separate Vercel projects from the same Git repository.

### Project 1: Frontend

- Import the repo into Vercel
- Set `Root Directory` to `frontend`
- Connect your main domain, for example `https://yourdomain.com`
- Add environment variable:
  - `VITE_API_BASE_URL=https://api.yourdomain.com`

### Project 2: Backend

- Import the same repo again into Vercel
- Set `Root Directory` to `backend`
- Connect a subdomain, for example `https://api.yourdomain.com`
- Add environment variables:
  - `APP_ORIGIN=https://yourdomain.com`
  - `DATABASE_URL=...`
  - `SMTP_HOST=...`
  - `SMTP_PORT=...`
  - `SMTP_USER=...`
  - `SMTP_PASS=...`
  - `MAIL_FROM=...`
  - `CONTACT_TO_EMAIL=...`

### Why Two Projects

This codebase runs as two applications in production:

- The frontend is a static Vite site
- The backend is an Express API

On Vercel, that is the clean and supported model for this repository.

## Database Schema

The PostgreSQL schema used by the backend is in `backend/schema.sql`.

## Contact

- Email: [minhdien678@gmail.com](mailto:minhdien678@gmail.com)
- LinkedIn: [linkedin.com/in/devdien](https://www.linkedin.com/in/devdien)
- GitHub: [@dienakdz](https://github.com/dienakdz)
