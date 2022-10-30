# SET-UP-JENKINS
- SSH to jenkins VM
- Create a script and run jenkins container by running this script
```
docker rm -f $(docker ps -aq)

docker rmi -f $(docker images -aq)

docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --restart=always -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk11
```
- Go to VM public-ip:8080 to see Jenkins

- Do the configuration and install Github and Publish over SSH plugin

- Copy key pem from azureuser from App VM so Jenkins can ssh to azureuser App VM

- Build a job to automate whenever there is new push on main branch github -> trigger job

- This job automatically ssh to App VM and run scripts to deploy
```
cd /home/azureuser;
bash -x deploy.sh;
```