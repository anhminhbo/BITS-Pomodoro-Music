

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.26.0"
    }
  }
}

provider "google" {
  credentials = file("./service_account.json")
  project     = var.project_id
}

# resource "google_project" "example_project" {
#   project_id = "example-project"
#   name       = "Example Project"
# }

# provider "google" {
#   alias   = "example_project"
#   version = "3.26.0"

#   project = google_project.example_project.project_id
# }

resource "google_compute_network" "pumi_network" {
  name    = "pumi-network"
  project = var.project_id
}

resource "google_compute_subnetwork" "pumi_subnetwork" {
  name          = "pumi-subnetwork"
  ip_cidr_range = "10.0.0.0/16"
  network       = google_compute_network.pumi_network.self_link
  project       = var.project_id
  region        = var.region
}

resource "google_compute_address" "static_ip" {
  name    = "static-ip"
  project = var.project_id
  region  = var.region
}

resource "google_compute_instance" "compute_instance" {
  name         = "pumi-app-server"
  machine_type = var.instance_type
  zone         = var.zone
  project      = var.project_id
  boot_disk {
    initialize_params {
      image = var.image_disk
    }
  }

  metadata = {
    ssh-keys = "anhminh:${file("~/.ssh/id_rsa.pub")}"
  }

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
      user        = "anhminh"
      private_key = file("~/.ssh/id_rsa")
      host        = google_compute_address.static_ip.address
    }
  }


  network_interface {
    subnetwork = google_compute_subnetwork.pumi_subnetwork.self_link

    access_config {
      nat_ip = google_compute_address.static_ip.address
    }
  }

  tags = ["pumi-app-server"]
}

resource "google_compute_firewall" "pumi_firewall" {
  name    = "pumi-firewall"
  network = google_compute_network.pumi_network.name
  project = var.project_id
  allow {
    protocol = "tcp"
    ports    = ["22", "80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["pumi-app-server"]
}

output "instance_ip" {
  value = google_compute_instance.compute_instance.network_interface.0.access_config.0.nat_ip
}
