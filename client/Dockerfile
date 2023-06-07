FROM node:18-alpine AS build

# STAGE 1
WORKDIR /client
COPY package.json .
RUN yarn install
COPY . /client
RUN npm run build

# STAGE 2
FROM node:18-alpine

WORKDIR /client
RUN npm install -g webserver.local
COPY --from=build /client/dist ./build

ENV NODE_ENV development
EXPOSE 4000

# start app
CMD ["npm", "run", "dev"] 