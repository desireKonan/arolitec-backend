FROM node:20.14-alpine

#python
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3015

CMD ["node", "dist/main"]
