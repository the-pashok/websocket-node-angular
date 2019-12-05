FROM node:12.13.1-alpine
RUN mkdir -p /server
WORKDIR /server
COPY package.json /server
RUN npm install
RUN ls
COPY . /server
EXPOSE 3000
CMD ["npm", "start"]
