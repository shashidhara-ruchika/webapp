#!/bin/bash

# Install Google Cloud Ops Agent
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Set up ops agent for webapp logs
sudo mv /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo chown root:root /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent
