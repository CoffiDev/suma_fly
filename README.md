## Project setup

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

`pnpm dev`

### Run and watch tests (optional)

`pnpm west`
