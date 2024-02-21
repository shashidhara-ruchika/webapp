#!/bin/bash

# Unzip packages
unzip /tmp/webapp.zip -d /opt/csye6225/

# Add env configs
cd /opt/csye6225/webapp/ || exit
touch .env
echo "PORT=8080" >> .env
echo "DATABASE_NAME=app_db" >> .env
echo "DATABASE_USER=app_user" >> .env
echo "DATABASE_PASSWORD=password" >> .env
echo "DATABASE_HOST=localhost" >> .env
echo "DATABASE_POOL_MAX=5" >> .env
echo "DATABASE_POOL_MIN=0" >> .env
echo "DATABASE_POOL_ACQUIRE=30000" >> .env
echo "DATABASE_POOL_IDLE=10000" >> .env
echo "DROP_DATABASE=false" >> .env
cat .env

# Install node packages
sudo npm install
