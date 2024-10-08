#!/bin/bash

# Arguments: DOCKER_HUB_USERNAME, IMAGE_NAME, CONTAINER_NAME
# For DEV environment
DOCKER_HUB_USERNAME=$1
IMAGE_NAME=$2
CONTAINER_NAME=$3

# Get the list of tags for the specified image
TAGS=$(curl -s -H "Accept: application/json" https://hub.docker.com/v2/repositories/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}/tags)

# Filter the tags to get the latest one with "dev" in the end
LATEST_DEV_TAG=$(echo "$TAGS" | jq -r '.results[] | .name' | grep -E 'dev$' | sort -V | tail -1)

# Pull the latest image
PULL_OUTPUT=$(docker pull ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_DEV_TAG} 2>&1)

if echo "$PULL_OUTPUT" | grep -q "Image is up to date"; then
  echo "Image is already up to date, ignoring update..."
  exit 0
fi

# If the pull is successful, it means there's a newer version of the image
echo "Newer version of the image found, updating..."

# If the container is running, kill it
if docker ps -q -f name=${CONTAINER_NAME} > /dev/null; then
  # If the container exists, kill it
  docker kill ${CONTAINER_NAME}
  docker container rm ${CONTAINER_NAME}
fi

# Run the newly pulled image
docker run -d -e NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$WEB3FORMS_ACCESS_KEY -p 4000:4000 --restart=always --name ${CONTAINER_NAME} ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_DEV_TAG} npm run start_dev