#!/bin/bash

    docker build -t mohinigonawala90/backend-feed:latest udacity-c3-restapi-feed;
    docker tag $DOCKER_USER/backend-feed:latest $DOCKER_USER/backend-feed:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/backend-feed:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/backend-feed:latest;

    docker build -t mohinigonawala90/backend-user:latest udacity-c3-restapi-user;
    docker tag $DOCKER_USER/backend-user:latest $DOCKER_USER/backend-user:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/backend-user:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/backend-user:latest;

    docker build -t mohinigonawala90/frontend:latest udacity-c3-frontend;
    docker tag $DOCKER_USER/frontend:latest $DOCKER_USER/frontend:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/frontend:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/frontend:latest;
