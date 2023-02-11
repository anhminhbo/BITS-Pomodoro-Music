variable "region" {
  type        = string
  description = "The AWS region to use"
  default     = "as-southeast1" # Singapore
}

variable "zone" {
  type        = string
  description = "The AWS zone to use"
  default     = "ap-southeast-1c"
}


variable "instance_type" {
  type        = string
  description = "The AWS EC2 type to use"
  default     = "t2.micro"
}
