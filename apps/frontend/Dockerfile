FROM node:20-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --filter frontend... --no-frozen-lockfile

FROM deps AS build
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
COPY apps/frontend apps/frontend
COPY packages/types packages/types
RUN pnpm --filter frontend build

FROM nginx:1.27-alpine AS runtime
COPY apps/frontend/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
