FROM node:16.19-alpine

RUN apk update && apk upgrade
RUN apk --no-cache add curl
RUN apk add make g++ python3 git 
RUN npm i -g node-pre-gyp

RUN mkdir /app
WORKDIR /app

COPY package*.json .

RUN npm i

COPY src ./src
COPY public ./public
COPY tsconfig.json .
COPY .env .

CMD npm start