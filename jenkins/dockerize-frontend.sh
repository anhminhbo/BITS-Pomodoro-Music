cd $PROJ_DIR/BITS-Pomodoro-Music/frontend

DOCKER_BUILDKIT=1 docker build . -t bits-frontend:$newFrontendTag

docker tag bits-frontend:$newFrontendTag anhminhbo/bits-frontend:$newFrontendTag

docker push anhminhbo/bits-frontend:$newFrontendTag
