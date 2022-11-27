# Building IT Systems RMIT
Pomodoro Music player
## Software Architecture
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/readme-2.png" width=900 height=900>
    Software architecture
</p>


## To start project locally
- Clone source code
```
git clone https://{{username}}:{{access_token}}@github.com/anhminhbo/BITS-Pomodoro-Music.git
```

- Make sure your computer install docker and docker-compose or else:
## Install Docker (Windows)
- Uninstall old docker or docker-compose 
    - Go to Control panel
    - Choose Uninstall a program
    - Select Docker and uninstall
 
- Install WSL2 Linux kernel update and Ubuntu via https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
 
-  Install Docker Desktop(Docker-compose is included in Docker Desktop) via https://docs.docker.com/desktop/install/windows-install/
 
- Run Ubuntu installed in previous instruction
    - Make an account (password is invisible so be careful)
    - Close Ubuntu
 
- Run code below in terminal to check if Docker install correctly or not
```
docker -v
docker-compose -v
```
 
- Congrats you are done, if there are any bugs or errors please contact Mr Bug Fix Wanderer/anhminhbo <3

## Install Docker and Docker-compose (Linux, MacOs)
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
- Make sure you are using a bash terminal to run the following code

### Start to do frontend part
```
bash -x local_startup.sh
```

### Start to do backend part
```
bash -x local_startup.sh backend
```

## After finish development, clean up everything
- Make sure you are using a bash terminal to run the following code
```
bash -x clean-up.sh
```

## How to merge master branch into your development branch
- Make sure you are using a bash terminal to run the following code
- First arg is the name of the branch you want to merge, Second arg is your commit message for your current branch
- Here I want to merge minh-dev to my branch with the message of my new commit
```
bash push_current_and_merge.sh minh-dev ""
```

## Docs
- Refers to [here](https://viblo.asia/p/deploy-ung-dung-docker-nodejs-mongo-redis-1VgZvMzYKAw?fbclid=IwAR29RauowCOzyP9PddKFq4TeQb9eFpPa1D2VjWbg0G6MhjAihEwCN78U_H0)