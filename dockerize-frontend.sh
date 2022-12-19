# docker rmi -f $(docker images -aq)
frontendTag=$1
# cd ..
ROOT_DIR=$(pwd)

cd $ROOT_DIR/frontend

# DOCKER_BUILDKIT=1 docker build -f Dockerfile.development -t anhminhbo/bits-frontend:$frontendTag .
DOCKER_BUILDKIT=1 docker build . -t anhminhbo/bits-frontend:$frontendTag


docker push anhminhbo/bits-frontend:$frontendTag

cd $ROOT_DIR

# if [[ "$(docker images -q bits-frontend:1 2> /dev/null)" == "" ]]; then
#     echo "Build failed"
#     exit 1
# fi
