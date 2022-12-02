## Technical challenge notes
refer to `NOTES.md` on this directory

## Project dependencies

### Install docker and docker compose (optional)

We use docker and docker compose to provide an easier setup

### Install nodejs

We suggest to use volta to manage different node versions (https://volta.sh/)

### Install pnpm

refer to https://pnpm.io/installation

---

## Project development setup

### Install dependencies

`pnpm install`

### Start DB with docker (optional)

If you do not have a running postgres instance, or you want to
develop it locally with docker, you can start one with:

`docker-compose up -d`

### Run migrations with prisma

This is also required to generate the prisma client dependencies

`npx prisma migrate dev`

### Start dev server

`make start_dev_server`

### Run and watch unit tests

`make test_unit_watch`

### Endpoints documentation

Take a look to the documentation at `http://localhost:3000/documentation/`

---

## Prisma(DB) tests

### Setup testing database

`make test_prisma_setup`

### Run prisma tests

`make test_prisma`

---

## Seed DB

**IMPORTANT** The flights.csv is omitted from the repo due to its size.
Ask for a copy of it and move it to `scripts/seed_files/flights.csv`

`make load_seeds`

