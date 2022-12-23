echo "Prepare to destroy infrastructure..."
sleep 5s
terraform init
terraform destroy -auto-approve
find . -type f -not \( -name 'ansible_hosts' -or -name 'ansible_hosts.template' -or -name 'ansible.apply_cert.yaml' -or -name 'ansible.config_vm.yaml.template' -or -name 'build_infra.sh' -or -name 'create_cert_domain.template.sh' -or -name 'default.conf' -or -name 'deploy.sh' -or -name 'destroy_infra.sh' -or -name 'docker-compose.yaml.runtime' -or -name 'main.tf' -or -name 'terraform.tfstate' -or -name 'aws-ec2-private-key.pem' \) -delete
echo "Done destroying infra."

exit 1