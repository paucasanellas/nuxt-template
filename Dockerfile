FROM node:22 AS builder

WORKDIR /src

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN CI=true pnpm install
RUN pnpm build

FROM node:22-alpine AS runtime

WORKDIR /src

COPY --from=builder /src/.output .output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
