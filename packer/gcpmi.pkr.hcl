packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "custom_image" {
  project_id              = var.project_id
  source_image            = var.source_image
  source_image_family     = var.source_image_family
  zone                    = var.zone
  region                  = var.region
  ssh_username            = var.ssh_username
  machine_type            = var.machine_type
  image_name              = var.image_name
  image_description       = var.image_description
  disk_size               = var.disk_size
  disk_type               = var.disk_type
  image_family            = var.image_family
  image_storage_locations = var.image_storage_locations
  image_project_id        = var.project_id
  network                 = var.network
}

build {
  sources = [
    "source.googlecompute.custom_image"
  ]

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"
  }

  provisioner "file" {
    source      = "./scripts/webapp.service"
    destination = "/tmp/"
  }

  provisioner "file" {
    source      = "./scripts/config.yaml"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts = [
      "./scripts/install_dependencies.sh",
      "./scripts/create_csye6225_user.sh",
      "./scripts/setup_log_dirs.sh",
      "./scripts/setup_webapp.sh",
      "./scripts/webapp_start.sh"
    ]

    environment_vars = [
      "DATABASE_NAME=${var.database_name}",
      "DATABASE_USER=${var.database_user}",
      "DATABASE_PASSWORD=${var.database_password}"
    ]

  }

}

variable "database_name" {
  description = "Webapp Postgres DB Name"
  type        = string
  default     = "app_db"
}

variable "database_user" {
  description = "Webapp Postgres DB User"
  type        = string
  default     = "app_user"
}

variable "database_password" {
  description = "Webapp Postgres DB Password"
  type        = string
  default     = "password"
}

variable "project_id" {
  description = "The project ID where the image will be created"
  type        = string
  default     = "project_id"
}

variable "source_image" {
  description = "The source image used for creating the custom image"
  type        = string
  default     = "centos-stream-8-v20240110"
}

variable "source_image_family" {
  description = "The family of the source image"
  type        = string
  default     = "centos-stream-8"
}

variable "zone" {
  description = "The zone in which the instance will be created"
  type        = string
  default     = "us-east1-b"
}

variable "region" {
  description = "The region where the instance will be created"
  type        = string
  default     = "us-east1"
}

variable "ssh_username" {
  description = "The SSH username for connecting to the instance"
  type        = string
  default     = "packer"
}

variable "machine_type" {
  description = "The machine type for the instance"
  type        = string
  default     = "e2-medium"
}

variable "image_name" {
  description = "The name of the custom image to be created. Use '{{timestamp}}' to include timestamp"
  type        = string
  default     = "csye6225-webapp-{{timestamp}}"
}

variable "image_description" {
  description = "The description of the custom image"
  type        = string
  default     = "csye6225 custom image"
}

variable "disk_size" {
  description = "The size of the disk in GB"
  type        = number
  default     = 100
}

variable "disk_type" {
  description = "The type of disk (e.g., pd-standard, pd-ssd)"
  type        = string
  default     = "pd-ssd"
}

variable "image_family" {
  description = "The family of the custom image"
  type        = string
  default     = "csye6225-custom-image"
}

variable "image_storage_locations" {
  description = "The list of storage locations for the image"
  type        = list(string)
  default     = ["us"]
}

variable "network" {
  description = "The network for the instance"
  type        = string
  default     = "default"
}
