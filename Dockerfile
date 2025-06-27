# 1. 빌드 단계
FROM node:22-alpine AS builder

WORKDIR /app
COPY . .


RUN npm install -g pnpm turbo
RUN pnpm install

# 앱들 빌드
RUN turbo run build --filter=client --filter=admin

# 2. 실행 단계
FROM node:22-slim

WORKDIR /app
COPY --from=builder /app .

RUN npm install -g pnpm concurrently

# 필요한 환경변수는 .env 파일로 EC2에 mount 또는 --env로 넘겨야 함

EXPOSE 3000 3001

#CMD ["concurrently", "--kill-others", "--names", "client,admin", \
#     "pnpm --filter client run start", \
#     "pnpm --filter admin run start"]
CMD ["sh", "-c", "concurrently --kill-others --names client,admin \"pnpm --filter client run start\" \"pnpm --filter admin run start\""]