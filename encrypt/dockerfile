FROM node:10.4.1-slim

RUN cd /opt
WORKDIR opt

COPY package.json yarn.lock ./
RUN yarn install

COPY . /opt

CMD yarn dev
