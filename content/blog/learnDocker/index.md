---
title: Learn Docker
date: "2023-01-05"
description: "Get started with docker"
subject: ["docker"]
---

#### Dockerfile

A Dockerfile is a text file that contains instructions for building a Docker image. It specifies the base image to use, as well as any dependencies, packages, and configurations that are needed for the image to run properly.

#### Volume

Volume is a persistent storage location that is outside the default Union File System of a container. It can be used to share files between the host file system and the container (Bind mount volume), or to allow containers to share data with each other. Volumes are also useful for storing data that needs to persist even when the container is no longer running, such as logs or database data (named volumes).

#### Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to define the services that make up your application in a single YAML file, and then start and stop all of them with a single command.

A Docker Compose file is a YAML file that defines how Docker containers should be configured and run. It specifies the services that make up your application, as well as any volumes, networks, and other resources that they need.

#### From Dockerfile to Image to Container

It all starts with **Dockerfile** that has instructions on how to build a specific **Docker image**. **Docker image** is an immutable file that contains source code, dependencies and tools needed to run an application. `docker build` creates image from Dockerfile. This image is then used as template to run an application in an isolated environment called **container**. `docker create` can be used to create a new container from an image.

- `docker create` : creates a fresh new container but doesn't run it immediately
- `docker start` : starts any stopped container
- `docker run` : creates and starts a new container immediately. It also can pull an image from Docker Hub if it doesn't find the mentioned image on your system

#### Common CLI commands

```shell
docker build .

# list docker images
docker image ls

# remove the specific docker image
docker image rm <image id>

# build an image with name
docker build -t <image name> .

# build a container with a custom name using an image in detached mode using binded host directory
# docker run -v $(pwd):/app -v /app/node_modules --env PORT=4000 -p 3000:4000 -d --name node-app node-app-image
# ro : readonly - you dont want containers creating files in your host directory
# in case you have multiple environment variables, you can use --env-file <env file dir> option instead of --env multiple times
docker run -v <path to folder on host machine>:<path to folder on container>:ro -v <path to files/folder you dont wanna sync with host folder> --env <env var key>=<env var value> -p <host machine port>:<container port> -d --name <container name> <image name>

# show running container processes
# -a : show all containers - started or stopped
docker ps [-a]

# delete a running container
# -f : force delete
# -v : delete associated volumes as well
docker rm <container name> -fv

# login to docker container in interactive mode
docker exec -it <container name> bash

# show logs of a container
docker logs <container name>

# list volumes
docker volume ls

# remove volume by its name
docker volume rm <volume name>

# remove all unnecessary volumes
docker volume prune

# start containers from docker compose file
# -d : detached mode
# --build : build images before starting containers
docker-compose up -d --build

# stop containers from docker compose file
# -v : delete unnecessary volumes that docker-compose created
# -v flag deletes named volumes as well, so refrain from using it in case of dbs
docker-compose down -v

# start containers using multiple docker compose files. files that come later overrides the
# common config from initial files
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# directly login to service like mongo
docker exec -it <container name> mongo -u <username> -p <password>

# get info like network about container
docker inspect <container name>

# list networks
docker network ls

# run specific container/service but ignore its dependencies
docker-compose -f <docker compose yaml file> up -d --no-deps <service name>

# run duplicate containers
docker-compose -f <docker compose file> up -d --scale <service name>=<number of instances>
```

#### Reference

- [repo](https://github.com/samya-ak/learn-docker)
