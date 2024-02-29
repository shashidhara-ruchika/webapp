#!/bin/bash

# Create Database
# sudo -u postgres psql -c "CREATE DATABASE $DATABASE_NAME;"

# Create User
# sudo -u postgres psql -c "CREATE USER $DATABASE_USER WITH PASSWORD '$DATABASE_PASSWORD';"
# sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DATABASE_NAME TO $DATABASE_USER;"

# Use md5 Postgres DB Connection Auth
# sudo sed -i.bak 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf

# Restart Postgres to apply changes
# sudo systemctl restart postgresql

# echo
echo "no database set up"
