data "aws_vpc" "default" {
    id = var.vpc_id
}

data "aws_subnet" "default" {
    id = var.subnet_id
}

data "aws_key_pair" "surim_site_key" {
    key_name = "surim_site_key"
    include_public_key = true
}

data "cloudflare_zone" "surim_site" {
    name = "surimkim.com"
}

resource "aws_instance" "surim_site" {
    ami = "ami-0862be96e41dcbf74"
    instance_type = "t2.micro"
    vpc_security_group_ids = [aws_security_group.surim_site_sg.id]
    subnet_id = data.aws_subnet.default.id
    associate_public_ip_address = true
    key_name = data.aws_key_pair.surim_site_key.key_name
    root_block_device {
        volume_size = 8
        volume_type = "gp2"
    }
    
    tags = merge(var.surim_site_tags,
        {
            Name = "${var.surim_site_tags["Application"]}_instance"
        }
    )
}

resource "aws_security_group" "surim_site_sg" {
    name = "surim_site_sg"
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    } 
    
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = merge(var.surim_site_tags,
        {
            Name = "${var.surim_site_tags["Application"]}_sg"
        }
    )
}

resource "cloudflare_record" "surim_site" {
    zone_id = data.cloudflare_zone.surim_site.id
    name = "@"
    value = "${aws_instance.surim_site.public_ip}"
    type = "A"
    ttl = 300
}

resource "cloudflare_record" "surim_site_www" {
    zone_id = data.cloudflare_zone.surim_site.id
    name = "www"
    value = data.cloudflare_zone.surim_site.name
    type = "CNAME"
    ttl = 300
}
