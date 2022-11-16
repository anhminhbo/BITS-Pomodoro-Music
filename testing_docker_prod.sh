# Fix error in Windows when env variable missing
export NODE_ENV=development

export ROOT_DIR=$(pwd)

bash -x clean_up.sh

# Run backend first and then frontend

cd $ROOT_DIR/dockerize

# Start building frontend backend parallel
bash -x dockerize.sh

docker-compose -f docker-compose.testing.yaml up -d