# Building IT Systems RMIT
Pomodoro Music player

## Software Architecture
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/readme-2.png" width=1200 height=1000>
    Notice only public IP
</p>


## To start project locally
- Clone source code
```
git clone https://{{username}}:{{access_token}}@github.com/anhminhbo/BITS-Pomodoro-Music.git
```

- Make sure your computer install docker and docker-compose or else:
## Install Docker and Docker-compose
- Uninstall old docker or docker-compose
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```
- Install docker and docker-compose
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
- Checking docker and docker-compose version
```
docker -v
docker-compose -v
```

## Start project by running script
```
bash -x local_startup.sh
```

## Docs
- Refers to [here](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw?fbclid=IwAR29RauowCOzyP9PddKFq4TeQb9eFpPa1D2VjWbg0G6MhjAihEwCN78U_H0)