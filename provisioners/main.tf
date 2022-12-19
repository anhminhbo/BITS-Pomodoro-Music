provider "aws" {
  region = "ap-southeast-1" # Singapore
}

# Create ssh key pair
resource "tls_private_key" "key" {
  algorithm = "RSA"
}

# Create private key for ec2
resource "local_sensitive_file" "private_key" {
  filename        = "${path.module}/aws-ec2-private-key.pem"
  content         = tls_private_key.key.private_key_pem
  file_permission = "0400"
}

resource "aws_key_pair" "key_pair" {
  key_name   = "aws-ec2-private-key"
  public_key = tls_private_key.key.public_key_openssh
}

###
# Configure Security Group for your ec2
###
resource "aws_security_group" "allow_ports" {
  # Inbound rules

  # Allow ssh
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow http
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow https
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  # Outbound rule
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

###
# Config OS
###
data "aws_ami" "ec2-ami" {
  # Get the ami of Ubuntu 20.04
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["amazon"]
}

###
# Create EBS size for App VM storage default is 30
###

resource "aws_volume_attachment" "ebs_att" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.storage.id
  instance_id = aws_instance.app-vm.id
}

resource "aws_ebs_volume" "storage" {
  availability_zone = "ap-southeast-1c"
  size              = 30
}

###
# Create EC2
###
resource "aws_instance" "app-vm" {
  ami                    = data.aws_ami.ec2-ami.id
  availability_zone      = "ap-southeast-1c"
  instance_type          = "t2.micro" # Remember to change this for low price
  vpc_security_group_ids = [aws_security_group.allow_ports.id]
  key_name               = aws_key_pair.key_pair.key_name

  # Install dependencies for ansible to connect when finished creating
  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install -y software-properties-common",
      "sudo apt-add-repository --yes --update ppa:ansible/ansible",
      "sudo apt install -y ansible"
    ]

    # Config for authenticaiton via ssh
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = tls_private_key.key.private_key_pem
      host        = self.public_ip
    }
  }

  #   # Execute ansible from local to do config for new vm
  #   provisioner "local-exec" {
  #     command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u ubuntu --key-file aws-ec2-private-key.pem -T 300 -i '${self.public_ip},', ansible.config_vm.yaml"
  #   }

  tags = {
    Name = "App Server"
  }
}

###
# Attach EIP for EC2
###
#Create an Elastic IP
resource "aws_eip" "ec2-eip" {
  vpc = true
}

#Associate EIP with EC2 Instance
resource "aws_eip_association" "ec2-eip-association" {
  instance_id   = aws_instance.app-vm.id
  allocation_id = aws_eip.ec2-eip.id

  #   provisioner "local-exec" {
  #     command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u ubuntu --key-file aws-ec2-private-key.pem -T 300 -i '${aws_eip.ec2-eip.public_ip},', ansible.apply_cert.yaml"
  #   }
}

output "ec2_elastic_ip" {
  value = aws_eip.ec2-eip.public_ip
}
