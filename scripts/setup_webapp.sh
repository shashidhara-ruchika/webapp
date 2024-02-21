#!/bin/bash

# Unzip packages
sudo unzip /tmp/webapp.zip -d /opt/csye6225/

# Add env configs
cd /opt/csye6225/webapp/ || exit 1
touch .env
{
  echo "PORT=8080"
  echo "DATABASE_NAME=app_db"
  echo "DATABASE_USER=app_user"
  echo "DATABASE_PASSWORD=password"
  echo "DATABASE_HOST=localhost"
  echo "DATABASE_POOL_MAX=5"
  echo "DATABASE_POOL_MIN=0"
  echo "DATABASE_POOL_ACQUIRE=30000"
  echo "DATABASE_POOL_IDLE=10000"
  echo "DROP_DATABASE=false"
} >> .env
cat .env

# Install node packages
sudo npm install
