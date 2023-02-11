variable "region" {
  type        = string
  description = "The GCP region to use"
  default     = "asia-southeast1" # Singapore
}

variable "zone" {
  type        = string
  description = "The GCP zone to use"
  default     = "asia-southeast1-a"
}

variable "project_id" {
  type        = string
  description = "The project id from GCP to use"
  default     = "encoded-bonfire-376514"
}

variable "image_disk" {
  type        = string
  description = "The image disk OS that Compute Engine GCP use"
  default     = "ubuntu-2004-focal-v20230125"
}


variable "instance_type" {
  type        = string
  description = "The GCP Compute Engine type to use"
  default     = "e2-medium"
}
