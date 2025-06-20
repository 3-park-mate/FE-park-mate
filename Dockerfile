# 1단계: 빌드 단계
FROM node:22-alpine AS builder

# corepack 활성화 및 pnpm 버전 고정
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 매니저 파일 복사
COPY turbo.json package.json pnpm-lock.yaml ./

# 루트 의존성 설치
RUN pnpm install

# 앱 소스 전체 복사
COPY . .

# 프론트엔드 앱 디렉토리로 이동하여 빌드
WORKDIR /app/apps/admin
RUN pnpm build

# 2단계: 실행 단계 (경량 이미지 사용)
FROM node:22-alpine AS runner

# corepack 활성화 및 pnpm 재설정
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

WORKDIR /app

# 빌드 산출물과 필요한 파일만 복사
COPY --from=builder /app/apps/admin/.next .next
COPY --from=builder /app/apps/admin/public public
COPY --from=builder /app/apps/admin/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# 실행 포트 환경변수
ENV PORT 3000
EXPOSE 3000

CMD ["pnpm", "start"]