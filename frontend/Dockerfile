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
# Creator
LABEL author="Minh Nguyen"
LABEL maintainer="Minh Nguyen"
LABEL alias="BugFixWanderer"
LABEL email="nca.minh8897@gmail.com"
LABEL linkedln="https://www.linkedin.com/in/cuong-anh-minh-nguyen/"
LABEL youtube="https://www.youtube.com/channel/UCRUJYpLa_nQrR6NY5Uy6egQ"

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