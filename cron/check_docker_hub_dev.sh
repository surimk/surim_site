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

# Get the current tag of the running container
CURRENT_TAG=$(docker inspect -f '{{ .Config.Image }}' ${CONTAINER_NAME} | cut -d ':' -f 2-)

# Check if the latest tag is different from the current tag
if [ "$LATEST_DEV_TAG" != "$CURRENT_TAG" ]; then
  # If the tags are different, it means there's a newer version of the image
  echo "Newer version of the image found, updating..."

  # If the container is running, kill it
  if docker ps -q -f name=${CONTAINER_NAME} > /dev/null; then
    # If the container exists, kill it
    docker kill ${CONTAINER_NAME}
    docker container rm ${CONTAINER_NAME}
  fi

  # Run the newly pulled image
  docker run -d -e NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$WEB3FORMS_ACCESS_KEY -p 4000:4000 --restart=always --name ${CONTAINER_NAME} ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:${LATEST_DEV_TAG} npm run start_dev
else
  echo "No new version of the image found, skipping update."
fi