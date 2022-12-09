# Install dependencies only when needed - Dependencies installation stage
FROM node:16-alpine as deps-installer

WORKDIR /app
COPY package* ./

# Install app dependencies
# A wildcard * is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm i --only=production

# App running stage
FROM node:16-alpine as runner

# Create app directory
WORKDIR /app

# # Fix An unknown git error occured
# RUN apk add git

COPY --from=deps-installer /app/node_modules ./node_modules

# Bundle app source
COPY . .

CMD [ "npm","run", "start" ]