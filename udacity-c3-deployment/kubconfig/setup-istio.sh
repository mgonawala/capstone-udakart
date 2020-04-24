#!/bin/bash
curl -L https://istio.io/downloadIstio | sh -
export PATH=$PATH:$HOME/.istioctl/bin
istioctl manifest apply --set profile=demo
kubectl label namespace default istio-injection=enabled
