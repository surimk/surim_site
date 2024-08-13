variable cloudflare_api_token {
    description = "Cloudflare API Token"
    type        = string
    default     = ""
}

variable "vpc_id" {
    description = "VPC ID"
    type        = string
    default     = ""
}

variable "subnet_id" {
    description = "Subnet ID"
    type        = string
    default     = ""
}

variable "domain_name" {
    description = "Domain Name"
    type        = string
    default     = ""
}

variable "surim_site_tags" {
    description = "Tags for Resources"
    type        = map(string)
    default     = {
        Application = "surim_site"
        Owner       = "Surim Kim"
        Environment = "dev"
    }
}
