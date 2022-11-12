docker rmi -f $(docker images -aq)

cd ..

cd frontend

DOCKER_BUILDKIT=1 docker build . -t bits-frontend:$newFrontendTag

cd ..

cd dockerize

if [[ "$(docker images -q bits-frontend:$newFrontendTag 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi
