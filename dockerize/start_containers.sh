bash -x $ROOT_DIR/clean_up.sh

backendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-backend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)
frontendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-frontend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)
#proxyTag=$(cat proxy-tag)

# backendLocalUrl="http\:\/\/localhost\:8080"
backendProdUrl="https\:\/\/pumidoro-music.homes"

# Gen for productiom
cat docker-compose.production.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$frontendTag/g" | \
#    sed "s/\[\[PROXY_TAG\]\]/$proxyTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$backendTag/g" | \
    sed "s/\[\[BACKEND_URL\]\]/$backendProdUrl/g"  \
    > docker-compose.production.yaml

# # Gen for local
# cat docker-compose.yaml.template | \
# #    sed "s/\[\[FRONTEND_TAG\]\]/$frontendTag/g" | \
#     sed "s/\[\[BACKEND_TAG\]\]/1/g" | \
#     sed "s/\[\[BACKEND_URL\]\]/$backendLocalUrl/g"  \
#     > docker-compose.yaml

# Run containers locally
docker compose up -d