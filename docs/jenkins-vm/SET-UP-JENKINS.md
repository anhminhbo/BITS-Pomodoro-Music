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

## Configure Jenkins UI
- Go to VM public-ip:8080 to see Jenkins
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-1.png" width=1000 height=800>
    Login page
</p>


- Skip and then go to homepage and install Github and Publish over SSH plugins
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-2.png" width=1000 height=800>
    Manage Plugins
</p>

- Under Dashboard > Manage Jenkins >Configure System, went down to Publish over SSH > SSH Servers
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-3.png" width=1000 height=800>
    Add azure key pem to here so Jenkins can ssh to App VM
</p>


- Build a job to automate whenever there is new push on main branch github Poll SCM <p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-4.png" width=1000 height=800>
    Config Jenkins to listen to our github
</p>

<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-5.png" width=1000 height=800>
    Check every minutes of push event on main branch`
</p>

<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/jenkins-vm/jenkins-6.png" width=1000 height=800>
    Config job to ssh to App VM and execute the script to deploy
</p>

- This job automatically ssh to App VM and run scripts to deploy

```
cd /home/azureuser;
bash -x deploy.sh;
```
