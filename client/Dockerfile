FROM node:12.13.1-alpine
RUN mkdir -p /front
WORKDIR /front
COPY package.json /front
RUN npm install
COPY . /front
EXPOSE 4200
CMD ["npm", "start"]
