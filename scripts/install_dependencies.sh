#!/bin/bash

# OS Update
sudo yum update -y
sudo yum upgrade -y

# Install zip
sudo yum install -y unzip

# Install node.js
sudo yum install -y gcc-c++ make
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
node -v
npm -v

# Install postgres
# sudo yum install -y postgresql-server postgresql-contrib
# sudo postgresql-setup --initdb
# sudo systemctl start postgresql.service
# sudo systemctl enable postgresql.service

# Install Google Cloud Ops Agent
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Set up ops agent for webapp logs
# sudo cat /tmp/config.yaml >> /etc/google-cloud-ops-agent/config.yaml
su -c "cat /tmp/config.yaml >> /etc/google-cloud-ops-agent/config.yaml"
su -c "cat /etc/google-cloud-ops-agent/config.yaml"
sudo systemctl restart google-cloud-ops-agent
