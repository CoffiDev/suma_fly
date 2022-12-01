import fs from "node:fs"
import readline from "node:readline"

import { PrismaClient } from "@prisma/client"
import path from "path";

const prisma = new PrismaClient()

let counter = 0

const startTime = new Date().getTime()

const fileName = 'flights.csv'
const pathName = path.resolve(__dirname, './seed_files/', fileName)

processLineByLine().then(() => {
  console.log(`${fileName} saved to db`)
})

async function processLineByLine() {
  const fileStream = fs.createReadStream(pathName)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let batch = []
  const batchLengthToSave = 10_000

  for await (const line of rl) {
    counter = counter + 1

    // skip headers line
    if(counter === 1) {
      continue
    }

    const [
      year,
      month ,
      day ,
      dayOfWeek,
      airline ,
      flightNumber,
      tailNumber ,
      originAirport,
      destinationAirport,
      scheduledDeparture ,
      departureTime ,
      departureDelay ,
      taxiOut ,
      wheelsOff,
      scheduledTime,
      elapsedTim ,
      airTime ,
      distance ,
      wheelsOn ,
      taxiIn ,
      scheduledArrival,
      arrivalTime ,
      arrivalDelay ,
      diverted ,
      cancelled ,
      cancellationReason,
      airSystemDelay ,
      securityDelay ,
      airlineDelay ,
      lateAircraftDelay,
      weatherDelay ,
    ] = line.split(',')

    const row = {
      year: parseInt(year || '0'),
      month: parseInt(month || '0'),
      day: parseInt(day || '0') ,
      dayOfWeek: parseInt(dayOfWeek || '0'),
      airline,
      flightNumber: parseInt(flightNumber || '0'),
      tailNumber: tailNumber,
      originAirport: originAirport,
      destinationAirport: destinationAirport,
      scheduledDeparture: parseInt(scheduledDeparture || '0'),
      departureTime: parseInt(departureTime || '0'),
      departureDelay: parseInt(departureDelay || '0'),
      taxiOut: parseInt(taxiOut || '0'),
      wheelsOff: parseInt(wheelsOff || '0'),
      scheduledTime: parseInt(scheduledTime || '0'),
      elapsedTime: parseInt(elapsedTim || '0'),
      airTime: parseInt(airTime || '0'),
      distance: parseInt(distance || '0'),
      wheelsOn: parseInt(wheelsOn || '0'),
      taxiIn: parseInt(taxiIn || '0'),
      scheduledArrival: parseInt(scheduledArrival || '0'),
      arrivalTime: parseInt(arrivalTime || '0'),
      arrivalDelay: parseInt(arrivalDelay || '0'),
      diverted: parseInt(diverted || '0'),
      cancelled: parseInt(cancelled || '0'),
      cancellationReason,
      airSystemDelay: parseInt(airSystemDelay || '0'),
      securityDelay: parseInt(securityDelay || '0'),
      airlineDelay: parseInt(airlineDelay || '0'),
      lateAircraftDelay: parseInt(lateAircraftDelay || '0'),
      weatherDelay: parseInt(weatherDelay || '0'),
    }

    batch.push(row)

    if(batch.length === batchLengthToSave) {
      console.log(counter.toLocaleString() + '- ' + (new Date().getTime() - startTime).toLocaleString() + 'ms')

      await prisma.flights.createMany({ data: batch})

      batch = []
    }
  }
}
