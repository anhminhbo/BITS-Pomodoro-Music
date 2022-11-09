FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard * is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# # Fix An unknown git error occured
# RUN apk add git

RUN npm ci --only=production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm","run", "start" ]