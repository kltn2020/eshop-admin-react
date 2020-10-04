#!/bin/bash

docker rm -f eshop-frontend

docker run -d --name eshop-frontend \
  --network my-net \
  -p 81:80 \
  ${DOCKER_IMAGE}:$BUILD_NUMBER
