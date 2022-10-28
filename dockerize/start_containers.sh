bash -x clean_up_containers.sh

backendTag=$(grep "backend" current-tag | cut -d'=' -f2)
frontendTag=$(grep "frontend" current-tag | cut -d'=' -f2)

cat docker-compose.yaml.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$frontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$backendTag/g"  \
    > docker-compose.yaml

docker compose up -d