-- create a role for the admin of the db
CREATE USER admin_gb WITH LOGIN PASSWORD 'carotte';

-- create the database
CREATE DATABASE getbalanced OWNER admin_gb;