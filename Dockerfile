# Build
FROM node:22 AS builder

WORKDIR /src

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


# Runtime
FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=builder /src/.output /app

EXPOSE 3000

CMD ["node", "server/index.mjs"]
