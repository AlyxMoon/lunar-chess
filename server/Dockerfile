FROM node:8

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --pure-lockfile --skip-integrity-check

COPY . .

EXPOSE 8080
