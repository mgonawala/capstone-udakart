#!/bin/bash

    docker-compose -f deployment/docker/docker-compose.yaml build;
    docker-compose -f deployment/docker/docker-compose.yaml push;

    docker tag mohinigonawala90/user:dev mohinigonawala90/user:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/user:${TRAVIS_BUILD_NUMBER};

    docker tag mohinigonawala90/item:dev mohinigonawala90/item:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/item:${TRAVIS_BUILD_NUMBER};

    docker tag mohinigonawala90/order:dev mohinigonawala90/order:${TRAVIS_BUILD_NUMBER};
    docker push $DOCKER_USER/order:${TRAVIS_BUILD_NUMBER};
