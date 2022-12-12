# Comments this for each component
# Run parallely
### Build and push image for Proxy to dockerhub
# bash -x dockerize-proxy.sh &
frontendTag=$1
backendTag=$2
### Build and push image for Frontend to dockerhub

bash -x dockerize-frontend.sh $frontendTag &

### Build and push image for Backend to dockerhub

bash -x dockerize-backend.sh $backendTag

wait
echo "Build and push parallely for frontend, backend successfully"