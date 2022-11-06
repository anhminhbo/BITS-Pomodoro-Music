backendTag=$(cat backend-tag)
newBackendTag=$(($backendTag + 1 ))

docker rmi -f $(docker images -aq)

cd ..

cd backend

DOCKER_BUILDKIT=1 docker build . -t bits-backend:$newBackendTag 

cd ..

cd dockerize

if [[ "$(docker images -q bits-backend:$newBackendTag 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi

docker tag bits-backend:$newBackendTag anhminhbo/bits-backend:$newBackendTag

docker push anhminhbo/bits-backend:$newBackendTag

echo "$newBackendTag" > backend-tag

docker rmi -f $(docker images -aq)