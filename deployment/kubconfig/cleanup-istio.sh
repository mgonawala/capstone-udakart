#!/bin/bash

curl -sL https://istio.io/downloadIstioctl | sh -
export PATH=$PATH:$HOME/.istioctl/bin
istioctl manifest generate --set profile=demo | kubectl delete -f -