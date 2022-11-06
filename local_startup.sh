# Run parallely backend and frontend locally

cd dockerize && bash -x start_containers.sh  &

cd frontend && npm start
