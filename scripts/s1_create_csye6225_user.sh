#!/bin/bash

# Create User & Group
sudo groupadd csye6225
sudo adduser csye6225 --shell /usr/sbin/nologin -g csye6225
# sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo mkdir /opt/csye6225

# Provide Access
sudo chown -R csye6225:csye6225 /opt/csye6225
sudo chmod -R 775 /opt/csye6225
sudo chmod g+s /opt/csye6225
