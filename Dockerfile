# syntax = docker/dockerfile:1

FROM oven/bun:1.3.0-slim AS base

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV DO_NOT_TRACK=1


# Throw-away build stage to reduce size of final image
FROM base AS builder

# Install node modules
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application code
COPY . .

# Build the project
RUN bun run build


# Final stage for app image
FROM base AS runner

# Don't run production as root
RUN addgroup --system --gid 998 runnergroup
RUN adduser --system --uid 998 runneruser
USER runneruser

# Copy built application
COPY --from=builder --chown=runneruser:runnergroup /app/dist/ /app/
# COPY --from=builder --chown=runneruser:runnergroup /app/.env.production /app/

# Start the server by default, this can be overwritten at runtime
EXPOSE 8080/tcp

# CMD [ "bunx", "--silent", "@dotenvx/dotenvx", "run", "--", "./server" ]
CMD [ "./server" ]
