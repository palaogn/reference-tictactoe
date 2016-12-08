#!/bin/bash

# Delete all docker containers
docker rm $(docker ps -a -q)
# Delete all docker images
docker rmi $(docker images -q)
