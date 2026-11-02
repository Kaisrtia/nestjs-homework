FROM node:16-alpine3.18 AS base
WORKDIR /app
COPY package*.json ./

FROM base AS dependencies
RUN npm install

FROM dependencies AS build
COPY . ./