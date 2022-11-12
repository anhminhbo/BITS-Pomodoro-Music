cd $PROJ_DIR/BITS-Pomodoro-Music/backend

DOCKER_BUILDKIT=1 docker build . -t bits-backend:$newBackendTag

docker tag bits-backend:$newBackendTag anhminhbo/bits-backend:$newBackendTag

docker push anhminhbo/bits-backend:$newBackendTag

docker rmi -f $(docker images -aq)