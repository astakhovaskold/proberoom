#!/bin/sh
set -eu

pnpm prisma migrate deploy
pnpm prisma db seed

exec "$@"
