FROM node:8

WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

EXPOSE 8080
