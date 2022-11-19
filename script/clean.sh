#!/bin/sh

psql -U postgres -h $POSTGRES_HOSTNAME blogging < ./sql/clean.sql
