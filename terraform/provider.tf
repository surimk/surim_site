provider "aws"  {
    region = "us-east-2"
}

provider "cloudflare" {
    api_token = var.cloudflare_api_token
}

terraform {
    backend "s3" {
        bucket = "terraform-surim"
        key = "surim_site/terraform.tfstate"
        region = "us-east-2"
    }

    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
        cloudflare = {
            source = "cloudflare/cloudflare"
            version = "~> 4.0"
        }
    }
}
