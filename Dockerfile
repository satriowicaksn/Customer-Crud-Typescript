FROM node:14.17.3-slim

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --loglevel verbose

COPY . /app

CMD ["npm", "start"]