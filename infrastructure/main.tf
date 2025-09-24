
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = "us-central1"
}

# Central logging bucket for application and audit logs.
resource "google_storage_bucket" "logging_bucket" {
  name          = var.bucket_name
  location      = "US"
  force_destroy = false # Set to true in non-prod environments if needed

  uniform_bucket_level_access = true

  lifecycle_rule {
    condition {
      age = 90 # Days
    }
    action {
      type = "Delete"
    }
  }

  versioning {
    enabled = true
  }
}
