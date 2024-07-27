data "aws_vpc" "default" {
    id = var.vpc_id
}

data "aws_subnet" "default" {
    id = var.subnet_id
}

resource "aws_instance" "surim_site" {
    ami = "ami-0b0dcb5067f272e55"
    instance_type = "t2.micro"
    vpc_security_group_ids = [aws_security_group.surim_site_sg.id]
    subnet_id = data.aws_vpc.default.id
    associate_public_ip_address = true

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
    egress {
        from_port = 3000
        to_port = 3000
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = merge(var.surim_site_tags,
        {
            Name = "${var.surim_site_tags["Application"]}_sg"
        }
    )
}
