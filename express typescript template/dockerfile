FROM node:10.4.1-slim

RUN cd /opt/ && mkdir node-typescript-bootstrap
WORKDIR opt/node-typescript-bootstrap

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . /opt/node-typescript-bootstrap

RUN yarn clean:dist
RUN yarn build:dist

EXPOSE 3000

CMD yarn start:prod
