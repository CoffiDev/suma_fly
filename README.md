## Project setup

### Install docker and docker compose (optional)

We use docker and docker compose to provide an easier setup

### Install pnpm

refer to https://pnpm.io/installation

### Start DB with docker (optional)

If you do not have a running postgres instance, or you want to 
develop it locally with docker, you can start one with:

`docker-compose up`

### Install dependencies

`pnpm install`

### Run migrations with prisma

This is also required to generate the prisma client dependencies

`npx prisma migrate dev`

### Start dev server

`make start_dev_server`

### Run and watch tests (optional)

`pnpm west`
