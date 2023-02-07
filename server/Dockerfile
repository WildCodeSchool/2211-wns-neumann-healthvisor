FROM node:16.19-alpine

RUN apk --no-cache add curl

RUN mkdir /app
WORKDIR /app

COPY package*.json .


RUN npm i

COPY src ./src
COPY tsconfig.json .
COPY .eslintrc.js .

CMD npm start