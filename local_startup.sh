# Fix error in Windows when env variable missing
export NODE_ENV=development

# Run parallely backend and frontend locally

cd dockerize && bash -x start_containers.sh  &

cd frontend && npm start
