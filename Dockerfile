FROM node:16-alpine

WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . .

RUN chmod +x /app/public/env_vars.sh
