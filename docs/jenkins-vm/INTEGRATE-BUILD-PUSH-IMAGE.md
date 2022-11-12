# INTEGRATE-BUILD-PUSH-IMAGE
- Be root user:
```
sudo su
```
- Add docker group to azureuser
```
usermod -aG docker azureuser
```
- Go back to azureuser
```
su azureuser
```
- Make a dir:
```
mkdir -p projects/bits
```
- Clone the source code of the main branch of bits pomodoro music
```
git clone https://github.com/anhminhbo/BITS-Pomodoro-Music.git
```
- Config in Jenkins add ssh configuration Jenkins VM to Jenkins containers
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-10.png" width=1000 height=1000>
    Add ssh configuration of Jenkins VM in Jenkins container
</p>

- Login to your docker hub
```
docker login
```

- Inside projects/bits create 3 files:
    - buildAndPushImageOnJenkinsVm.sh
```
export PROJ_DIR=$(pwd)

# Get dockerhub latest image tag
latestBackendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-backend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)
latestFrontendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-frontend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)

# New tag
export newBackendTag=$(($latestBackendTag + 1 ))
export newFrontendTag=$(($latestFrontendTag + 1 ))

# Now go to src to get size
cd $PROJ_DIR/BITS-Pomodoro-Music

# Get previous size of backend and frontend size
prevBackendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/backend/src | cut -d"h" -f1 | cut -d"/" -f1)
prevFrontendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/frontend/src | cut -d"h" -f1 | cut -d"/" -f1)

# Get latest main branch

git pull origin main

# Get current src folder size of backend and frontend
backendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/backend/src | cut -d"h" -f1 | cut -d"/" -f1)
frontendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/frontend/src | cut -d"h" -f1 | cut -d"/" -f1)

# Go back to project dir
cd $PROJ_DIR

# Build and push new image based on differences
if [[ $backendSrcSize != $prevBackendSrcSize ]] && [[ $frontendSrcSize != $prevFrontendSrcSize ]]; then

    bash -x dockerize-backend.sh &

    bash -x dockerize-frontend.sh 

elif [[ $backendSrcSize != $prevBackendSrcSize ]]; then

    bash -x dockerize-backend.sh

elif [[ $frontendSrcSize != $prevFrontendSrcSize ]]; then

    bash -x dockerize-frontend.sh 
    
else
    echo "Nothing new to build"
    exit 0
    
fi
docker rmi -f $(docker images -aq)
```
    - dockerize-backend.sh
```
cd $PROJ_DIR/BITS-Pomodoro-Music/backend

DOCKER_BUILDKIT=1 docker build . -t bits-backend:$newBackendTag

docker tag bits-backend:$newBackendTag anhminhbo/bits-backend:$newBackendTag

docker push anhminhbo/bits-backend:$newBackendTag
```
    - dockerize-frontend.sh
```
cd $PROJ_DIR/BITS-Pomodoro-Music/frontend

DOCKER_BUILDKIT=1 docker build . -t bits-frontend:$newFrontendTag

docker tag bits-frontend:$newFrontendTag anhminhbo/bits-frontend:$newFrontendTag

docker push anhminhbo/bits-frontend:$newFrontendTag

```

- Create a new Job BuildAndPush copy from DeployProduction, instead of connect to Apps VM, now connect to Jenkins VM to execute
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-11.png" width=1000 height=1000>
    Excecute the job
</p>

- Set up Post Build action
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-12.png" width=1000 height=1000>
    Trigger next job of failed email dev
</p>


