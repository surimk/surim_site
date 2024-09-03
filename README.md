# Surim Kim's Porfolio Website

This website is built on Next.js. There is both a production and development environment.
- surimkim.com
- dev.surimkim.com

The web server is running on an AWS Cloud EC2 instance and all AWS resources are backed as infrastructure-as-code via Terraform.
- Terraform code located under `/terraform`
- Scripts under the `/cron` directory are ran as a cron job in the EC2, in order to fetch prod and dev docker images on docker hub.

Github Actions is used as CI/CD and handles builds and deployments on both production and development. Commitizen with conventional commits is used for version tagging.
- `main.yaml` workflow is triggered on pushes to the main branch
- `dev.yaml` workflow is triggered upon pull-requests against the main branch


## Initial AWS EC2 Setup

To create the AWS EC2 instance (and Cloudflare DNS records), go into the `/terraform` directory then run:
```
terraform apply
```

Once `terraform apply` is ran and EC2 instance has created, these steps must be completed.

ssh into the newly created EC2 instance and install dependencies (docker and nginx):

```
sudo apt update
sudo apt upgrade -y
sudo apt install docker.io -y
sudo apt install nginx -y
```

Pull the docker image

```
sudo docker pull surimkim/surim_site:{VERSION}
```

Set web3forms public API key as an environment variable

```
export WEB3FORMS_ACCESS_KEY="{API_KEY}"
```

For prod, run docker image on port 3000 and name container as surim_site_prod

```
sudo docker run -d -e NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$WEB3FORMS_ACCESS_KEY -p 3000:3000 --name surim_site_prod surimkim/surim_site:{VERSION}
```

For dev container, run docker image on port 4000 and name container as surim_site_dev and use `npm run dev` command

```
sudo docker run -d -e NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$WEB3FORMS_ACCESS_KEY -p 4000:4000 --name surim_site_dev surimkim/surim_site:{VERSION-dev} npm run start_dev
```

### Enable HTTPS

First, scp in cloudflare ssl cert and private key

After, create a new `default.conf` in `/etc/nginx/conf.d` and configure as:

```
server {
    listen 80;
    server_name surimkim.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name surimkim.com;

    ssl_certificate {PATH TO CERT};
    ssl_certificate_key {PATH TO KEY};

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen 443 ssl;
    server_name dev.surimkim.com;

    ssl_certificate {PATH TO CERT}
    ssl_certificate_key {PATH TO KEY};

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```

then restart nginx with:

```
sudo systemctl restart nginx
```

### Cron Job for Pulling and Running Latest Docker Image

The script `check_docker_hub_prod.sh` and `check_docker_hub_dev.sh` in `cron` directory will check if the latest docker images for both prod and dev have been pulled. If not, it will pull the most recent pushed docker image, kill the older version container, and relaunch with the latest prod or dev image. This script takes in 3 arguments: DOCKER_HUB_USERNAME IMAGE_NAME CONTAINER_NAME.

This script is set as a cron job to run every 10 minutes on the EC2 machine to ensure latest deployment.

To enable, first copy/scp `check_docker_hub_{prod and dev}.sh` into the EC2, ssh into it, then:

make the script an executable and move to `/usr/local/bin`

```
sudo chmod +x check_docker_hub_{prod and dev}.sh
sudo mv check_docker_hub_{prod and dev}.sh /usr/local/bin/
```

then set cron job with `crontab -e`

and add the followling line to file:

```
*/10 * * * * sudo /usr/local/bin/check_docker_hub_prod.sh surimkim surim_site surim_site_prod
*/10 * * * * sudo /usr/local/bin/check_docker_hub_dev.sh surimkim surim_site surim_site_dev
```

finally, save and exit the editor.

## Testing Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```