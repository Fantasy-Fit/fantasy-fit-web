FROM node

WORKDIR /client
# # Copy app files
COPY package.json .

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./client/package.json
COPY package-lock.json ./client/package-lock.json
RUN npm install

# add app
COPY . ./
ENV NODE_ENV development
EXPOSE 4000

# start app
CMD ["npm", "run", "dev"] 