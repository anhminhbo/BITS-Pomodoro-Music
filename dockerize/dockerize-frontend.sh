backendTag=$(grep "backend" current-tag | cut -d'=' -f2)
frontendTag=$(grep "frontend" current-tag | cut -d'=' -f2)
newFrontendTag=$(($frontendTag + 1 ))

docker rmi -f $(docker images -aq)

cd ..

cd frontend

docker build . -t bits-frontend:$newFrontendTag 

cd ..

cd dockerize

if [[ "$(docker images -q bits-frontend:$newFrontendTag 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi

docker tag bits-frontend:$newFrontendTag anhminhbo/bits-frontend:$newFrontendTag

docker push anhminhbo/bits-frontend:$newFrontendTag

cat current-tag.template | \
    sed "s/\[\[FRONTEND_TAG\]\]/$newFrontendTag/g" | \
    sed "s/\[\[BACKEND_TAG\]\]/$backendTag/g"  \
    > current-tag

docker rmi -f $(docker images -aq)