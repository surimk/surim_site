#!/bin/bash

# Arguments: DOCKER_HUB_USERNAME, IMAGE_NAME, CONTAINER_NAME
# For PROD environment
DOCKER_HUB_USERNAME=$1
IMAGE_NAME=$2
CONTAINER_NAME=$3

# Get the list of tags for the specified image
TAGS=$(curl -s -H "Accept: application/json" https://hub.docker.com/v2/repositories/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}/tags)

# Parse the JSON response and extract the tags with their last_pushed_at timestamp
TAGS=$(echo "${TAGS}" | jq -r '.results[] | .name + " " + .last_updated')

# Filter out tags that contain "dev" and sort the remaining tags by the last_pushed_at timestamp
LATEST_TAG=$(echo "${TAGS}" | grep -v "dev" | sort -r -k 2 -t ' ' | head -1 | cut -d ' ' -f 1)

# Check if latest tag has been pulled
if ! docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_TAG}"; then
# Pull the latest image
  docker pull ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_TAG}

  # If the container is running, kill it
  if docker ps -q -f name=${CONTAINER_NAME} > /dev/null; then
    # If the container exists, kill it
    docker kill ${CONTAINER_NAME}
    docker container rm ${CONTAINER_NAME}
  fi

  # Run the newly pulled image
  docker run -d -p 3000:3000 --restart=always --name ${CONTAINER_NAME} ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_TAG}
fi
