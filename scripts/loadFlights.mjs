import fs from "fs"
import {parse} from "csv-parse"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

let counter = 0

fs.createReadStream("/Users/m/Downloads/archive/flights.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    // console.log(row);
    
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
    ] = row
    
    console.log(row, counter)
    counter = counter + 1
    let y = counter

    prisma.flights.create({
      data: {
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
      }
    }).catch((e) => {
      console.log(e, y)
    })

  })
  .on("end", function () {
    console.log("finished")
  })
  .on("error", function (error) {
    console.log(error.message)
  })
