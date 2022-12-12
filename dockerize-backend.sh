# docker rmi -f $(docker images -aq)
backendTag=$1

ROOT_DIR=$(pwd)

cd $ROOT_DIR/backend

DOCKER_BUILDKIT=1 docker build . -t anhminhbo/bits-backend:$backendTag

docker push anhminhbo/bits-backend:$backendTag

cd $ROOT_DIR