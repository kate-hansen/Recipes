FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 g++ make

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["node", "--no-experimental-fetch", "--no-experimental-global-webcrypto", "node_modules/.bin/payload", "dev"]