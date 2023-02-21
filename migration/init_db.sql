-- create role for the admin db
CREATE USER admin_gb WITH LOGIN PASSWORD 'patate';


--create database
CREATE DATABASE getbalanced OWNER admin_gb;