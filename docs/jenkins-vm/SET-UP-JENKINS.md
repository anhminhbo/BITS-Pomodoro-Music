# SET-UP-JENKINS

- SSH to jenkins VM

## Remember to run as root priviledge

```
sudo su
```

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

## Create script to auto start Jenkins by container

- Create a script and run jenkins container by running this script

```
docker rm -f $(docker ps -aq)

docker rmi -f $(docker images -aq)

docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --restart=always -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk11
```

- Go to VM public-ip:8080 to see Jenkins
<p align="center">
    <img src="https://github.com/massbitprotocol/massbitroute_deploy/blob/minh-dev/docs/images/SIGN-UP-1.png?raw=true" width=1000 height=800>
    Massbit login protocol
</p>


- Skip and then go to homepage and install Github and Publish over SSH plugins

- Copy key pem from azureuser from App VM so Jenkins can ssh to azureuser App VM

- Build a job to automate whenever there is new push on main branch github Poll SCM -> trigger job

- This job automatically ssh to App VM and run scripts to deploy

```
cd /home/azureuser;
bash -x deploy.sh;
```
