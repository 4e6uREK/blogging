# Typescript Express Blogging REST API

## Features
1. Two types of users: admin and blogger
2. Authentication done using *JWT* technology
3. *bloggers* can create posts.
4. *bloggers* can update posts.
5. *bloggers* can see their posts whether they're public or hidden
6. *bloggers* can see posts of other bloggers as long as they're public
7. *admins* can do all from above
8. *admins* can see all posts of all bloggers
9. *admins* can remove any post

## Technologies used
1. JWT
2. PostgreSQL
3. Prisma ORM
4. Express
5. Typescript
6. Docker
7. Prometheus Express Exporter

## How to run tests
In order to successfully run tests you need running PostgreSQL instance.
This repository already have Shell script which utilises Docker for that.
In root directory just run:
```shell
sh script/start_db.sh
```
Next in root directory run:
```shell
npm run full-coverage
```
Done...
