provider "aws"  {
    access_key = env("AWS_ACCESS_KEY_ID")
    secret_key = env("AWS_SECRET_ACCESS_KEY")
    region = "us-east-2"
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
    }
}
