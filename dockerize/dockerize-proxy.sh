proxyTag=$(cat proxy-tag)
newProxyTag=$(($proxyTag + 1 ))

cd ..

cd nginx

docker build . -t bits-proxy:$newProxyTag

cd ..

cd dockerize

if [[ "$(docker images -q bits-proxy:$newProxyTag 2> /dev/null)" == "" ]]; then
    echo "Build failed"
    exit 1
fi

docker tag bits-proxy:$newProxyTag anhminhbo/bits-proxy:$newProxyTag

docker push anhminhbo/bits-proxy:$newProxyTag

echo "$newProxyTag" > proxy-tag

docker rmi -f $(docker images -aq)
