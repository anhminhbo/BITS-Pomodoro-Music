# docker rmi -f $(docker images -aq)

cd ..

cd frontend

DOCKER_BUILDKIT=1 docker build -f Dockerfile.development -t bits-frontend:1 .

if [[ "$(docker images -q bits-frontend:1 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi
