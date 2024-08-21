output "ec2_public_ip" {
    value = aws_instance.surim_site.public_ip
    description = "The public IP address of the EC2 instance"
}
