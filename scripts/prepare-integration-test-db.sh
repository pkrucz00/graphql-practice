#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"

echo '▶️ Starting database for integration tests...'

echo '🟡      - Loading environment variables...'
source .env.test

echo '🟡🟡    - Waking docker compose up...'
docker-compose up -d

echo '🟡🟡🟡  - Waiting for database to be ready...'
"$DIR"/wait-until  "docker compose exec -T -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} db psql -U ${POSTGRES_USER} ${POSTGRES_DB} -c 'select 1'"  15

echo "🟡🟡🟡🟡  - Performing database migration using prisma..."
yarn prisma migrate dev --name init

echo "🟢🟢🟢🟢🟢 - Database is ready! 🐘"

