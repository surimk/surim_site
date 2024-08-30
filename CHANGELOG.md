## 0.2.1 (2024-08-30)

### Fix

- test with new cz config
- test with new cz config

## 0.2.0 (2024-08-30)

### Feat

- create dev environment [skip-ci] (#1)

### Fix

- test conventional commits triggering bump gh action
- test conventional commits triggering bump gh action
- test version bump on updated main gh action
- update EC2 to t3.micro [skip ci]
- add check_docker_hub.sh script to cron [skip ci]

## 0.1.0 (2024-08-14)

### Feat

- add cloudflare provider and DNS record
- create react_build gh action, initate before docker_build

### Fix

- add commitizen to github actions
- get site ready for https
- set deployment version, have it working on http domain
- Dockerfile, use platform linux/amd64
- initial working main.tf, ec2 instance and sg
- have docker_build run after react_build_test in main gh action
- change action push branch to main
- push correct repo name to build action
- fix dockerfile, dont include gitignore file
- fix docker-compose and update README

### Refactor

- merge workflows into main.yaml gh action
