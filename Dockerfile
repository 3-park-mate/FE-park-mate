# 1단계: 빌드 스테이지
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

WORKDIR /app

COPY turbo.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install

COPY . .

WORKDIR /app/apps/admin
RUN pnpm install && pnpm build

# 2단계: 런타임
FROM node:22-alpine AS runner

WORKDIR /app

# 빌드된 산출물 복사
COPY --from=builder /app/apps/admin/.next .next
COPY --from=builder /app/apps/admin/public ./public
COPY --from=builder /app/apps/admin/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]