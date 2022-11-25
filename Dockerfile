FROM node:16

WORKDIR /usr/index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]

