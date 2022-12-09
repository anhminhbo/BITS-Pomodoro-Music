# docker rmi -f $(docker images -aq)

cd ..

cd backend

DOCKER_BUILDKIT=1 docker build . -t bits-backend:1

if [[ "$(docker images -q bits-backend:1 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi