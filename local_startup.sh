# Fix error in Windows when env variable missing
export NODE_ENV=development


ROOT_DIR=$(pwd)

# Check if node modules existed in frontend
if [[ -d "$ROOT_DIR/frontend/node_modules" ]]; then
    echo "Frontend already had node modules, no need to install"
else
    cd $ROOT_DIR/frontend && npm install
fi

# Run backend first and then frontend

cd $ROOT_DIR/dockerize && bash -x start_containers.sh

cd $ROOT_DIR/frontend && npm start
