frontendTag=$(grep "frontend" current-tag | cut -d'=' -f2)
backendTag=$(grep "backend" current-tag | cut -d'=' -f2)
newBackendTag=$(($backendTag + 1 ))

docker rmi -f $(docker images -aq)

cd ..

cd backend

docker build . -t bits-backend:$newBackendTag 

cd ..

cd dockerize

if [[ "$(docker images -q bits-backend:$newBackendTag 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi

docker tag bits-backend:$newBackendTag anhminhbo/bits-backend:$newBackendTag

docker push anhminhbo/bits-backend:$newBackendTag

cat current-tag.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$frontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$newBackendTag/g"  \
    > current-tag

docker rmi -f $(docker images -aq)