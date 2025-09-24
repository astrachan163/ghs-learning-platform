
variable "project_id" {
  description = "The Google Cloud project ID."
  type        = string
}

variable "bucket_name" {
  description = "The name for the central logging bucket. Must be globally unique."
  type        = string
}
