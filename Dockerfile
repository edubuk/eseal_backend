FROM alpine:3.18.4

RUN apk add --no-cache curl

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "run index.ts"]
