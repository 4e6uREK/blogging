#!/bin/sh

createdb -U postgres -h $POSTGRES_HOSTNAME blogging
psql -U postgres -h $POSTGRES_HOSTNAME blogging < ./sql/schema.sql
