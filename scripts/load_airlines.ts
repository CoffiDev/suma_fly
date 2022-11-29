import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const airlines = `IATA_CODE,AIRLINE
UA,United Air Lines Inc.
AA,American Airlines Inc.
US,US Airways Inc.
F9,Frontier Airlines Inc.
B6,JetBlue Airways
OO,Skywest Airlines Inc.
AS,Alaska Airlines Inc.
NK,Spirit Air Lines
WN,Southwest Airlines Co.
DL,Delta Air Lines Inc.
EV,Atlantic Southeast Airlines
HA,Hawaiian Airlines Inc.
MQ,American Eagle Airlines Inc.
VX,Virgin America`
    .split("\n")
    .slice(1)
    .map((x) => {
      const [iataCode, airline] = x.split(",")

      return { iataCode, airline }
    })

  const result = await prisma.airlines.createMany({
    data: airlines.map((a) => {
      return a
    }),
  })
  console.log(result)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
