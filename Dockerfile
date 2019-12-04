FROM node:10-alpine
RUN mkdir -p /server/node_modules && chown -R node:node /server
WORKDIR /server
COPY package*.json ./
