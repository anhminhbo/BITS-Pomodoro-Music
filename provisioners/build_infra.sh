###
### $1: domain name, $2: frontend port, $3: backend port
###

domain=$1
frontendPort=$2
backendPort=$3
exitcode=$?

### HANDLE USER PRESS CONTROL + C TO STOP THE SCRIPT
# trap ctrl-c and call handle_control_c()
trap handle_control_c INT

function handle_control_c() {
    echo "Handling destroy all resources before ending the script..."
    sleep 5s
    bash destroy_infra.sh
    exit 1
}

### CREATE NGINX CONFIG
cat default.conf | \
sed "s/\[\[DOMAIN\]\]/$domain/g" | \
sed "s/\[\[FRONTEND_PORT\]\]/$frontendPort/g" | \
sed "s/\[\[BACKEND_PORT\]\]/$backendPort/g" \
> $domain

###  CREATE DOCKER-COMPOSE TEMPLATE
cat docker-compose.yaml.runtime | \
sed "s/\[\[BACKEND_URL\]\]/https\:\/\/$domain/g" | \
sed "s/\[\[FRONTEND_PORT\]\]/$frontendPort/g" | \
sed "s/\[\[BACKEND_PORT\]\]/$backendPort/g" \
> docker-compose.yaml.template

### CREATE CERT SCRIPT FOR WEBSITE
cat create_cert_domain.template.sh | \
sed "s/\[\[DOMAIN\]\]/$domain/g" \
> create_cert_domain.sh

### CREATE CONFIG VM BASED ON DOMAIN FOR ANSIBLE
cat ansible.config_vm.yaml.template | \
sed "s/\[\[DOMAIN\]\]/$domain/g" \
> ansible.config_vm.yaml

### CREATE INFRA ON AWS

terraform init
terraform plan -auto-approve
terraform apply -auto-approve

IP=$(terraform output -raw ec2_elastic_ip)
echo "Your App VM IP: $IP"

### CREATE ANSIBLE HOSTS FOR ANSIBLE TO ACCESS
cat ansible_hosts.template | \
sed "s/\[\[IP\]\]/$IP/g" \
> ansible_hosts

### Make sure ansible can connect to the newly created VM
testConnection=$(ANSIBLE_HOST_KEY_CHECKING=False ansible all -m ping -u ubuntu --key-file aws-ec2-private-key.pem -T 30 -i ansible_hosts | grep "|" | cut -d " " -f3)
while [ "$testConnection" != "SUCCESS" ]; do
    echo "Check connection from Ansible to App VM..."
    if [ $exitcode -ne 0 ]; then
        bash destroy_infra.sh
    fi

    if [ "$testConnection" == "SUCCESS" ]; then
        break 
    fi
    echo "Current connection status is: $testConnection"
    testConnection=$(ANSIBLE_HOST_KEY_CHECKING=False ansible all -m ping -u ubuntu --key-file aws-ec2-private-key.pem -T 30 -i ansible_hosts | grep "|" | cut -d " " -f3)
    sleep 2s

done

### CONFIG THE VM
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u ubuntu --key-file aws-ec2-private-key.pem -T 1000 -i ansible_hosts ansible.config_vm.yaml

echo "Waiting to apply cert..."
sleep 5s

### Get the current IP of the domain
currentIP=$(nslookup $domain | grep Address | tail -n 1 | cut -d" " -f2)

### WAIT FOR DOMAIN TO POINT TO APP VM IP
while [ "$currentIP" != "$IP" ]; do
    ### Get the current IP of the domain
    currentIP=$(nslookup $domain | grep Address | tail -n 1 | cut -d" " -f2)

    ### APPLY CERT FOR YOUR WEB APP IF MATCHED
    if [ "$currentIP" == "$IP" ]; then
        ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u ubuntu --key-file aws-ec2-private-key.pem -T 1000 -i ansible_hosts ansible.apply_cert.yaml
        break
        ### If any errors happend --> destroy everything
        if [ $exitcode -ne 0 ]; then
            bash destroy_infra.sh
        fi
    fi

    echo "Your App VM IP is $IP, your domain is currently point to $currentIP, make sure they are MATCHED. It takes 0-72h to change globally even if you do correctly."
    sleep 5s
done

### If any errors happend --> destroy everything
if [ $exitcode -ne 0 ]; then
    bash destroy_infra.sh
fi

### DELETE RUNTIME FILES WHEN SUCCESS
find . -type f -not \( -name 'ansible_hosts.template' -or -name 'ansible.apply_cert.yaml' -or -name 'ansible.config_vm.yaml.template' -or -name 'build_infra.sh' -or -name 'create_cert_domain.template.sh' -or -name 'default.conf' -or -name 'deploy.sh' -or -name 'destroy_infra.sh' -or -name 'docker-compose.yaml.runtime' -or -name 'main.tf' -or -name 'terraform.tfstate' -or -name 'aws-ec2-private-key.pem' \) -delete

### DONE
echo "Done building infrastructure of your web app. Ref: BugFixWanderer"