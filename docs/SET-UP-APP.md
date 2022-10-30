# SET-UP-APP
- SSH to App VM
- Create deploy.sh script:
```
docker rmi -f $(docker images -aq)

PROJ_DIR=projects/bits

currentFrontendTag=$(cat $PROJ_DIR/docker-compose.yaml | grep "image: anhminhbo/bits-frontend:" | cut -d":" -f3)
currentBackendTag=$(cat $PROJ_DIR/docker-compose.yaml | grep "image: anhminhbo/bits-backend:" | cut -d":" -f3)
currentProxyTag=$(cat $PROJ_DIR/docker-compose.yaml | grep "image: anhminhbo/bits-proxy:" | cut -d":" -f3)

gitFrontendTag=$(curl https://api.github.com/repos/anhminhbo/BITS-Pomodoro-Music/contents/dockerize/frontend-tag | jq -r ".content" | base64 --decode)
gitBackendTag=$(curl https://api.github.com/repos/anhminhbo/BITS-Pomodoro-Music/contents/dockerize/backend-tag | jq -r ".content" | base64 --decode)
gitProxyTag=$(curl https://api.github.com/repos/anhminhbo/BITS-Pomodoro-Music/contents/dockerize/proxy-tag | jq -r ".content" | base64 --decode)

if [ "$currentFrontendTag" == "$gitFrontendTag" ] && [ "$currentBackendTag" == "$gitBackendTag" ] && [ "$currentProxyTag" == "$gitProxyTag" ] ; then
   echo "Nothing to deploy"
   exit 1
fi

sudo cat $PROJ_DIR/docker-compose.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$gitFrontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$gitBackendTag/g" | \
    sed "s/\[\[PROXY_TAG\]\]/$gitProxyTag/g" \
    > $PROJ_DIR/docker-compose.yaml

cd $PROJ_DIR

sudo docker-compose up --force-recreate -d

docker rmi -f $(docker images -aq)
```
- Make dirs and cd to projects/bits/
- Create docker-compose.yaml.template:
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
      - MONGO_URL=mongodb+srv://anhminhbo:Anhminh1234*@cluster0.djeak2p.mongodb.net/?retryWrites=true&w=majority
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
    - '3000:3000'
    environment:
      - REACT_APP_BACKEND_URL=http://20.189.121.242

  bits-proxy:
    container_name: bits-proxy
    restart: always
    image: anhminhbo/bits-proxy:[[PROXY_TAG]]
    depends_on:
      - bits-backend
      - bits-frontend
    ports:
    - '80:80'
```

