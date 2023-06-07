FROM node:18-alpine AS build

# STAGE 1 - copy app, install dependencies and build
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

# add app
COPY . ./
ENV NODE_ENV development
EXPOSE 4000

# start app
CMD ["npm", "run", "dev"] 