FROM node:alpine

RUN npm i -g pnpm

RUN apk add --no-cache make