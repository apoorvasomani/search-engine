#!/bin/bash

mysql -u root -p < create-db.sql
./manage.py syncdb
