FROM node:18-alpine

WORKDIR /source
COPY . .

RUN cd client && npm i && npm run build
RUN cd server && npm i && npm run build
CMD cd server && npm run start

EXPOSE 3000
