# Comments this for each component
# Run parallely
### Build and push image for Proxy to dockerhub
# bash -x dockerize-proxy.sh &

### Build and push image for Frontend to dockerhub
bash -x test-dockerize-frontend.sh &

### Build and push image for Backend to dockerhub

bash -x test-dockerize-backend.sh

wait
echo "Build and push parallely for frontend, backend successfully"