#!/bin/bash

# Create Logs Directory
sudo mkdir /var/log/csye6225
sudo mkdir /var/log/csye6225/webapp

# Provide Logs Directory Access
sudo chown -R csye6225:csye6225 /var/log/csye6225/
sudo chmod -R 775 /var/log/csye6225/

# Unzip packages
sudo unzip /tmp/webapp.zip -d /opt/csye6225/

# Go to Webapp Dir
cd /opt/csye6225/webapp/

# Install node packages
sudo npm install
