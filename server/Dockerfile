FROM node:8

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

EXPOSE 8080
