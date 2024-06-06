FROM node:20.14-alpine

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

RUN npm uninstall bcrypt

COPY . .

RUN npm run build

EXPOSE 3015

CMD ["node", "dist/main"]
