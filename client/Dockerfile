FROM node:18-alpine AS build

# STAGE 1 - copy app, install dependencies and build
WORKDIR /client
COPY package.json .
RUN yarn install
COPY . /client
RUN npm run build

# STAGE 2 - use nginx to serve app
FROM nginx:stable-alpine
COPY --from=build /client/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off";]