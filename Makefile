start_dev_server:
	pnpm dev

load_seeds:
	npx ts-node scripts/seedAirlines.ts
	npx ts-node scripts/seedAirports.ts
	npx ts-node scripts/seedFlights.ts

test_unit:
	pnpm tapUnit

test_unit_watch:
	pnpm tapUnit --watch

setup_dev_prisma:
	npx prisma migrate dev

test_prisma_setup:
	docker-compose up -d
	npx dotenv -e .env.test npx prisma migrate dev

test_prisma:
	@echo " ---- Be sure that the testing DB is running ----"
	npx dotenv -e .env.test pnpm tapPrisma
