## 1. 빌드 단계
#FROM node:22-alpine AS builder
#
#WORKDIR /app
#COPY . .
#
#
#RUN npm install -g pnpm turbo
#RUN pnpm install
#
## 앱들 빌드
#RUN turbo run build --filter=client --filter=admin
#
## 2. 실행 단계
#FROM node:22-slim
#
#WORKDIR /app
#COPY --from=builder /app .
#
#RUN npm install -g pnpm concurrently
#
## 필요한 환경변수는 .env 파일로 EC2에 mount 또는 --env로 넘겨야 함
#
#EXPOSE 3000 3001
#
##CMD ["concurrently", "--kill-others", "--names", "client,admin", \
##     "pnpm --filter client run start", \
##     "pnpm --filter admin run start"]
#CMD ["sh", "-c", "concurrently --kill-others --names client,admin \"pnpm --filter client run start\" \"pnpm --filter admin run start\""]

# 1단계: Build Stage
FROM node:22 AS builder

WORKDIR /app

# 코드 복사
COPY . .

# corepack 기반 pnpm 활성화
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# 전역 turbo 설치
RUN npm install -g turbo --unsafe-perm

# 의존성 설치
RUN pnpm install

# 빌드 실행
RUN turbo run build --filter=client --filter=admin

# 2단계: Run Stage
FROM node:22-alpine AS runner

WORKDIR /app

# ps, curl 설치
RUN apk add --no-cache procps curl

# corepack 기반 pnpm 재설정
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# 코드 복사
COPY --from=builder /app .

EXPOSE 3000 3001

# 서버 실행
CMD ["sh", "-c", "npx concurrently --kill-others --names 'client,admin' \
  'pnpm --filter=client start' \
  'pnpm --filter=admin start'"]--filter=admin start'"]