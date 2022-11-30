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
    # Backup files before new deploy
    timeSuffix=$(date +%d-%m-%Y-time-%H-%M-%S)
    cp $PROJ_DIR/docker-compose.yaml $PROJ_DIR/backups/docker-compose.backup-${timeSuffix}.yaml 
    
    # Make a new docker compose file based on new tag
    cat $PROJ_DIR/docker-compose.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$dockerHubFrontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$dockerHubBackendTag/g" \
    > $PROJ_DIR/docker-compose.yaml

cd $PROJ_DIR

sudo docker-compose up --force-recreate -d

#docker rmi -f $(docker images -aq)