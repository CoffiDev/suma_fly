
load_seeds:
	npx ts-node scripts/seedAirlines.ts
	npx ts-node scripts/seedAirports.ts
	npx ts-node scripts/seedFlights.ts

test_prisma:
	dotenv -e .env.test pnpm tapPrisma
