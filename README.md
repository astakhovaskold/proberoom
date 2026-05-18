# Proberoom

Self-hosted platform for technical interviews with a real-time collaborative code editor and white-label branding.

[![AGPL License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Stack

- **Frontend** — React 19, Vite, TypeScript
- **Backend** — NestJS, TypeScript
- **Monorepo** — pnpm workspaces


## Requirements

- Node.js >= 20
- pnpm >= 9

```bash
npm install -g pnpm
```


## Installation

```bash
git clone https://github.com/your-org/proberoom.git
cd proberoom
pnpm install
```


## Development

Run all apps in parallel:

```bash
pnpm dev
```

Or run each app separately:

```bash
# Frontend (Vite dev server)
pnpm --filter frontend dev

# Backend (NestJS watch mode)
pnpm --filter backend dev
```


## Build

```bash
pnpm build
```


## Code Quality

```bash
pnpm check        # lint + format (Biome)
pnpm typecheck    # TypeScript type checking across all packages
```


## Docker Compose deployment

For a single-command on-premise deployment, copy the example environment file, set strong secrets, and start the stack:

```bash
cp .env.example .env
docker compose up
```

The Compose stack provisions PostgreSQL, builds the NestJS backend, builds the React frontend, and runs Nginx as the only public entrypoint. Nginx serves the React build at `/` and reverse-proxies `/api` requests to the backend container.

On each backend container start, `prisma migrate deploy` applies pending PostgreSQL migrations and `prisma db seed` provisions the first-run admin account from `FIRST_RUN_ADMIN_EMAIL`, `FIRST_RUN_ADMIN_PASSWORD`, and `FIRST_RUN_ADMIN_NAME`. The seed is idempotent: existing admin users with the configured email are promoted/renamed without resetting their password.

The most important deployment variables are documented in `.env.example`:

- `HTTP_PORT` — host port exposed by Nginx.
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` — database created by the PostgreSQL container.
- `FIRST_RUN_ADMIN_EMAIL`, `FIRST_RUN_ADMIN_PASSWORD`, `FIRST_RUN_ADMIN_NAME` — first admin account credentials.
- `VITE_API_URL` — frontend API base path, defaulting to `/api` for Nginx proxying.


## License

[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
