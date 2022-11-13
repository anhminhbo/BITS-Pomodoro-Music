# SET-UP-APP

- SSH to App VM

## Install Docker and Docker-compose

- Uninstall old docker or docker-compose

```
sudo apt-get remove docker docker-engine docker.io containerd runc
```

- Install docker and docker-compose

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

- Checking docker and docker-compose version

```
docker -v
docker-compose -v
```

## Install script to auto deploy using docker and docker-compose

- Create deploy.sh script:

```
docker rmi -f $(docker images -aq)

PROJ_DIR=projects/bits

currentFrontendTag=$(docker ps -a | grep "frontend" | cut -d" " -f4 | cut -d":" -f2)
currentBackendTag=$(docker ps -a | grep "backend" | cut -d" " -f4 | cut -d":" -f2)
#currentProxyTag=$(cat $PROJ_DIR/docker-compose.yaml | grep "image: anhminhbo/bits-proxy:" | cut -d":" -f3)

#gitFrontendTag=$(curl https://api.github.com/repos/anhminhbo/BITS-Pomodoro-Music/contents/dockerize/frontend-tag | jq -r ".content" | base64 --decode)
#gitBackendTag=$(curl https://api.github.com/repos/anhminhbo/BITS-Pomodoro-Music/contents/dockerize/backend-tag | jq -r ".content" | base64 --decode)
#gitProxyTag=$(curl https://api.github.com/repos/anhminhbo/BITS-Pomodoro-Music/contents/dockerize/proxy-tag | jq -r ".content" | base64 --decode)

dockerHubFrontendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-frontend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)
dockerHubBackendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-backend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)

#if [ "$currentFrontendTag" == "$gitFrontendTag" ] && [ "$currentBackendTag" == "$gitBackendTag" ] && [ "$currentProxyTag" == "$gitProxyTag" ] ; then
if [ "$currentFrontendTag" == "$dockerHubFrontendTag" ] && [ "$currentBackendTag" == "$dockerHubBackendTag" ]; then
   echo "Nothing to deploy"
   exit 0
fi

    cat $PROJ_DIR/docker-compose.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$dockerHubFrontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$dockerHubBackendTag/g" \
    > $PROJ_DIR/docker-compose.yaml

cd $PROJ_DIR

sudo docker-compose up --force-recreate -d

#docker rmi -f $(docker images -aq)
```

- Make dirs and cd to projects/bits/
- Create docker-compose.yaml.template:

```yaml
version: "3.8"
services:
  bits-backend:
    container_name: bits-backend
    restart: always
    image: anhminhbo/bits-backend:[[BACKEND_TAG]]
    ports:
      - "8080:8080"
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
      - "3000:80"
    environment:
      - NODE_ENV=production
      - BACKEND_URL=https://pumidoro-music.homes
      - WDS_SOCKET_PORT=0
```

- Remember to grant permission for azureuser to use docker and sudo
- Grant permission to run docker for azureuser

```
sudo usermod -aG docker
```

- Grant permission to run sudo

```
usermod -aG sudo azureuser
```

- Grant permission to read/write/execute on current directory

```
sudo chown -R azureuser:azureuser projects/bits
```

- Now upgrade size to B2s 4gb ram with 8gb storage

- Now follow to [Install nginx](https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/app-vm/2-INSTALL-NGINX.md)
