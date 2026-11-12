# Sanjay Chauhan Portfolio

This repository is organized as an npm-workspaces monorepo:

- `client/` — React + Vite portfolio frontend.
- `server/` — Express API and MongoDB contact-form persistence.

## Requirements

Use Node.js 20.19+ or 22.12+ and npm. The API also requires a MongoDB Atlas cluster.

## Install and configure

Run once from this repository root:

```powershell
npm install
Copy-Item .\server\.env.example .\server\.env
```

Set `MONGODB_URI` in `server/.env` to your Atlas connection string and replace `<db_password>` with the database user's URL-encoded password. Keep this file private; `.env` files are ignored by Git. The API connects to the `portfolio` database and ensures the `portfolio_contact_form` collection exists.

If you are already in the `server` folder, use `Copy-Item .env.example .env` there instead. The API loads `server/.env` regardless of whether you start it from the repository root or the `server` folder. The example's password is only a placeholder; the server will not start until you replace it with your actual Atlas database-user password.

## Run locally

Open two terminals at the repository root:

```powershell
npm run dev:server
```

```powershell
npm run dev:client
```

The client runs in Vite and proxies `/api` requests to the API on port `3001`. Configure `PORT` and `FRONTEND_ORIGIN` in `server/.env` when needed. See [client/README.md](./client/README.md) for frontend details.

## Build and lint

```powershell
npm run build
npm run lint
```

To run the production API, use `npm run start:server` from the repository root.
