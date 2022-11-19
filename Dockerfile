FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY tsconfig.json ./tsconfig.json
COPY src ./src

RUN npm run build

FROM node:18-alpine AS runner

EXPOSE 5000

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./

COPY --from=builder /app/build ./
COPY prisma ./prisma

RUN npm install && \
    npx prisma generate

CMD ["node", "index.js"]
