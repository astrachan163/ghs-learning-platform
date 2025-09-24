
# Infrastructure as Code (IaC)

This directory contains the Terraform configuration for the Georgia Homeschool Platform.

## Baseline Infrastructure (v0.1)

The current configuration defines the baseline infrastructure for the application, which includes:

- **Google Storage Bucket:** A central bucket (`google_storage_bucket.logging_bucket`) designed to store application and audit logs.

### Features
- **Uniform Access:** Bucket-level IAM permissions are enforced.
- **Lifecycle Policy:** Logs older than 90 days are automatically deleted.
- **Versioning:** Object versioning is enabled to prevent accidental data loss.

## Usage

1.  **Initialize Terraform:**
    ```bash
    terraform init
    ```

2.  **Plan Changes:**
    ```bash
    terraform plan -var="project_id=your-gcp-project-id" -var="bucket_name=your-globally-unique-bucket-name"
    ```

3.  **Apply Changes:**
    ```bash
    terraform apply -var="project_id=your-gcp-project-id" -var="bucket_name=your-globally-unique-bucket-name"
    ```
