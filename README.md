## Initial EC2 Setup

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

Run the docker container on port 3000 and name container as surim_site_prod
```
sudo docker run -d -p 3000:3000 --name surim_site_prod surimkim/surim_site:{VERSION}
```

### Enable HTTPS ###
First, scp in cloudflare ssl cert and private key

After, create a new `default.conf` in `/etc/nginx/conf.d` and configure as:
```
server {
    listen 80;
    server_name {DOMAIN NAME};

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name {DOMAIN NAME};

    ssl_certificate {PATH TO CERT};
    ssl_certificate_key {PATH TO KEY};

    location / {
        proxy_pass http://localhost:3000;
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

### Cron Job for Pulling and Running Latest Docker Image ###
The script `check_docker_hub.sh` in `cron` directory will check if the latest docker image has been pulled. If not, it will pull the most recent pushed docker image, kill the older version container, and relaunch with the latest image. This script takes in 3 arguments: DOCKER_HUB_USERNAME IMAGE_NAME CONTAINER_NAME. 

This script is set as a cron job to run every 10 minutes on the EC2 machine to ensure latest deployment.

To enable, first copy/scp `check_docker_hub.sh` into the EC2, ssh into it, then:

make the script an executable and move to `/usr/local/bin`
```
sudo chmod +x check_docker_hub.sh
sudo mv check_docker_hub.sh /usr/local/bin/
```

then set cron job with `crontab -e`

and add the followling line to file:
```
*/10 * * * * sudo /usr/local/bin/check_docker_hub.sh surimkim surim_site surim_site_prod
```

finally, save and exit the editor.

## Running NextJs App on Docker

Run dockerized version by either:

```bash
docker run --publish 3000:3000 surim_site:{VERSION}
# or use docker-compose
docker-compose up
```

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

