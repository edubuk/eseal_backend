FROM ubuntu:latest

ENV BUN_INSTALL=$HOME/.bun

ENV PATH=$BUN_INSTALL/bin:$PATH

RUN apt update -y

RUN apt install -y curl bash

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 4000

CMD ["bun", "run index.ts"]
