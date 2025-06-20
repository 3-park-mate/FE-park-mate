# 1단계: 빌드 스테이지
FROM node:22-alpine AS builder

# corepack으로 pnpm 활성화
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

# 작업 디렉토리 설정
WORKDIR /app

# turbo.json, 루트 package.json, pnpm-lock.yaml 복사
COPY turbo.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 모든 워크스페이스 의존성 설치
RUN pnpm install

# 전체 프로젝트 복사
COPY . .

# admin 디렉토리에서 직접 install → next 등도 포함
WORKDIR /app/apps/admin
RUN pnpm install && pnpm build

# 2단계: 경량 런타임 이미지
FROM node:22-alpine AS runner

WORKDIR /app

# 빌드 결과 복사
COPY --from=builder /app/apps/admin/.next .next
COPY --from=builder /app/apps/admin/public ./public
COPY --from=builder /app/apps/admin/package.json ./
COPY --from=builder /app/apps/admin/node_modules ./node_modules

# Next.js 서버 실행
CMD ["node_modules/.bin/next", "start"]