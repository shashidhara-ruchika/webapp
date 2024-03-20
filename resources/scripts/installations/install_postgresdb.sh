#!/bin/bash

# Install postgres
sudo yum install -y postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
