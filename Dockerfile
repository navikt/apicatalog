FROM node:20-alpine as builder


WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian11:nonroot

WORKDIR /app

COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/public /app/public/
COPY --from=builder /app/.next/static /app/.next/static/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]