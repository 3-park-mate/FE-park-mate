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

# 1단계: 빌드용 스테이지
FROM node:22-alpine AS builder

# corepack 사용 → pnpm 안정적으로 활성화
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

# 작업 디렉토리 설정
WORKDIR /app

# 소스 복사
COPY . .

# turbo, pnpm 등 설치
RUN pnpm install -g turbo

# 의존성 설치
RUN pnpm install

# 앱 빌드 (client, admin)
RUN turbo run build --filter=client --filter=admin

# 2단계: 실행용 스테이지
FROM node:22-alpine AS runner

# corepack 및 pnpm 활성화
RUN corepack enable && corepack prepare pnpm@9.15.5 --activate

# 앱 실행 디렉토리
WORKDIR /app

# 빌드 결과 복사
COPY --from=builder /app .

# concurrently 실행을 위한 설치
RUN pnpm add -g concurrently

# 포트 오픈
EXPOSE 3000 3001

# 환경변수는 .env 또는 --env 옵션으로 전달

# 앱 동시 실행
CMD ["concurrently", "--kill-others", "--names", "client,admin", "pnpm --filter client run start", "pnpm --filter admin run start"]