FROM node:12.14.0
WORKDIR /app
COPY package.json .
RUN npm install 
COPY build .
CMD node index.js
 