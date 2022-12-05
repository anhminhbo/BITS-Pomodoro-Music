export PROJ_DIR=$(pwd)

# Get dockerhub latest image tag
latestBackendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-backend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)
latestFrontendTag=$(curl -s -S "https://registry.hub.docker.com/v2/repositories/anhminhbo/bits-frontend/tags/" | jq '."results"[]["name"]' | sed -n 1p | cut -d'"' -f2)

# New tag
export newBackendTag=$(($latestBackendTag + 1 ))
export newFrontendTag=$(($latestFrontendTag + 1 ))

# Now go to src to get size
cd $PROJ_DIR/BITS-Pomodoro-Music

# # Get previous size of backend and frontend size
# prevBackendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/backend/src | cut -d"h" -f1 | cut -d"/" -f1)
# prevFrontendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/frontend/src | cut -d"h" -f1 | cut -d"/" -f1)

# Detect if backend src and frontend src has any changes
prevBackendSrcHash=$(find $PROJ_DIR/BITS-Pomodoro-Music/backend/src/ -type f -exec md5sum {} \; | sort -k 2 | md5sum)
prevFrontendSrcHash=$(find $PROJ_DIR/BITS-Pomodoro-Music/frontend/src/ -type f -exec md5sum {} \; | sort -k 2 | md5sum)

# Get latest main branch

git pull origin main

# # Get current src folder size of backend and frontend
# backendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/backend/src | cut -d"h" -f1 | cut -d"/" -f1)
# frontendSrcSize=$(du -s -b $PROJ_DIR/BITS-Pomodoro-Music/frontend/src | cut -d"h" -f1 | cut -d"/" -f1)

backendSrcHash=$(find $PROJ_DIR/BITS-Pomodoro-Music/backend/src/ -type f -exec md5sum {} \; | sort -k 2 | md5sum)
frontendSrcHash=$(find $PROJ_DIR/BITS-Pomodoro-Music/frontend/src/ -type f -exec md5sum {} \; | sort -k 2 | md5sum)


# Go back to project dir
cd $PROJ_DIR

# Build and push new image based on differences
# if [[ $backendSrcSize != $prevBackendSrcSize ]] && [[ $frontendSrcSize != $prevFrontendSrcSize ]]; then
if [[ $backendSrcHash != $prevBackendSrcHash ]] && [[ $prevFrontendSrcHash != $frontendSrcHash ]]; then

    bash -x dockerize-backend.sh &

    bash -x dockerize-frontend.sh 

# elif [[ $backendSrcSize != $prevBackendSrcSize ]]; then
elif [[ $backendSrcHash != $prevBackendSrcHash ]]; then

    bash -x dockerize-backend.sh

# elif [[ $frontendSrcSize != $prevFrontendSrcSize ]]; then
elif [[ $prevFrontendSrcHash != $frontendSrcHash ]]; then

    bash -x dockerize-frontend.sh 
    
else

    echo "Nothing new to build"
    exit 1

fi

echo "Build successfully"
docker rmi -f $(docker images -aq)
exit 0





