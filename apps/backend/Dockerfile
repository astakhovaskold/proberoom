FROM node:20-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --filter backend... --no-frozen-lockfile

FROM deps AS build
COPY apps/backend apps/backend
COPY packages/types packages/types
RUN pnpm --filter backend prisma:generate
RUN pnpm --filter backend build

FROM base AS runtime
ENV NODE_ENV=production
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --filter backend... --prod --no-frozen-lockfile
COPY --from=build /app/apps/backend/dist apps/backend/dist
COPY --from=build /app/apps/backend/prisma apps/backend/prisma
RUN pnpm --filter backend prisma:generate
COPY apps/backend/docker/entrypoint.sh /usr/local/bin/backend-entrypoint.sh
RUN chmod +x /usr/local/bin/backend-entrypoint.sh
WORKDIR /app/apps/backend
EXPOSE 3000
ENTRYPOINT ["backend-entrypoint.sh"]
CMD ["node", "dist/main.js"]
