# DOCKERIZE

- Dockerize backend, frontend based on instruction how to run them locally

## Dockerfile

- For frontend(React):

```Dockerfile
# Install dependencies only when needed - Dependencies installation stage
FROM node:16-alpine as deps-installer

WORKDIR /app
COPY package* ./
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm i --only=production

# This is builder stage to build source codes
FROM node:16-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /app

COPY . .

COPY --from=deps-installer /app/node_modules ./node_modules

# Build the app
RUN npm run build

# This is runner stage
# Bundle static assets with nginx
FROM nginx:stable-alpine as runner
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# copy .env.production as .env to the release build
COPY --from=builder /app/.env.production /usr/share/nginx/html/.env

# Add your nginx.conf
COPY --from=builder /app/nginx/react-proxy.conf /etc/nginx/conf.d/default.conf

# Run node runtime to update react env
RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra@0.2.2

WORKDIR /usr/share/nginx/html

# Start nginx
CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
```

- For backend(Express):

```Dockerfile
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
```

## Docker-compose

- For development:

```yaml
version: "3.8"
services:
  bits-backend:
    container_name: bits-backend
    restart: always
    image: bits-backend:1
    depends_on:
      - bits-redis
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
      - PORT=8080
      - MONGO_URL=mongodb+srv://anhminhbo:Anhminh1234@bits-local.gvnypfl.mongodb.net/?retryWrites=true&w=majority
      - REDIS_HOST=bits-redis
      - REDIS_PORT=6379
      - SESSION_SECRET=randomsessionsecret

  bits-frontend:
    container_name: bits-frontend
    restart: always
    image: bits-frontend:1
    depends_on:
      - bits-redis
      - bits-backend
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=development
      - BACKEND_URL=http://localhost:8080
      - WDS_SOCKET_PORT=0
      - API_KEY=AIzaSyAmltDENBZXKAf_pBzRbXZp9mISeRGl52M

  bits-redis:
    container_name: bits-redis
    restart: always
    image: redis:6.2-alpine
    ports:
      - "6379:6379"
    command: redis-server --save 20 1 --loglevel warning
```

- For production:

```yaml
version: '3.8'
services:
  bits-backend:
    container_name: bits-backend
    restart: always
    image: anhminhbo/bits-backend:[[BACKEND_TAG]]
    ports:
     - '8080:8080'
    environment:
      - NODE_ENV=production
      - PORT=8080
      - MONGO_URL=mongodb+srv://anhminhbo:Anhminh1234*@bits-production.ezlsoag.mongodb.net/?retryWrites=true&w=majority
      - REDIS_HOST=redis-12246.c1.ap-southeast-1-1.ec2.cloud.redislabs.com
      - REDIS_USERNAME=default
      - REDIS_PASSWORD=nqSWog7udIF3xi6wFWlaRuOntWo1R7CI
      - REDIS_PORT=12246
      - SESSION_SECRET=randomsessionsecret

  bits-frontend:
    container_name: bits-frontend
    restart: always
    image: anhminhbo/bits-frontend:[[FRONTEND_TAG]]
    ports:
    - '3000:80'
    environment:
      - NODE_ENV=production
      - BACKEND_URL=[[BACKEND_URL]]
      - WDS_SOCKET_PORT=0
      - API_KEY=AIzaSyAmltDENBZXKAf_pBzRbXZp9mISeRGl52M

```
