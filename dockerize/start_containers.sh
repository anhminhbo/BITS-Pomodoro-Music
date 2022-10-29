bash -x clean_up_containers.sh

backendTag=$(cat backend-tag)
frontendTag=$(cat frontend-tag)

backendLocalUrl="http\:\/\/localhost\:8080"
backendProdUrl="http\:\/\/20.189.121.242\:8080"

# Gen for productiom
cat docker-compose.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$frontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$backendTag/g" | \
    sed "s/\[\[BACKEND_URL\]\]/$backendProdUrl/g"  \
    > docker-compose.production.yaml

# Gen for local
cat docker-compose.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$frontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$backendTag/g" | \
    sed "s/\[\[BACKEND_URL\]\]/$backendLocalUrl/g"  \
    > docker-compose.yaml

# Run containers locally
docker compose up -d