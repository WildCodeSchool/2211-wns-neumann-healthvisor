FROM node:16.19-alpine

RUN apk update && apk upgrade
# RUN apk --no-cache add curl

RUN mkdir /app
WORKDIR /app

COPY package*.json .

RUN npm i

COPY src ./src
COPY public ./public
COPY tsconfig.json .

CMD npm start