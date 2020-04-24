FROM node:12
## create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8080
CMD ["npm","run","dev"]