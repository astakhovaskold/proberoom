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


## License

[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
