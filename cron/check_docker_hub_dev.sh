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

# Check if latest tag has been pulled
if ! docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_DEV_TAG}"; then
# Pull the latest image
  docker pull ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_DEV_TAG}

  # If the container is running, kill it
  if docker ps -q -f name=${CONTAINER_NAME} > /dev/null; then
    # If the container exists, kill it
    docker kill ${CONTAINER_NAME}
    docker container rm ${CONTAINER_NAME}
  fi

  # Run the newly pulled image
  docker run -d -e NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$WEB3FORMS_ACCESS_KEY -p 4000:4000 --restart=always --name ${CONTAINER_NAME} ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_DEV_TAG} npm run start_dev
fi
