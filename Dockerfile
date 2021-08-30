FROM node:14
WORKDIR /NODEJS-MONGODB-PROJECT
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","start"]
