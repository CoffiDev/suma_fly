import fs from "fs"
import path from "path"
import {parse} from "csv-parse"

import { PrismaClient, Airport } from "@prisma/client"

const prisma = new PrismaClient()

const airports: Omit<Airport, "id" | "uuid">[] = []

const fileName = 'airports.csv'

const onData = (row: any) => {
  const [iataCode, airport, city, state, country, lat, lon] = row

  const latitude = parseFloat(lat || "0")
  const longitude = parseFloat(lon || "0")

  airports.push({iataCode, airport, city, state, country, latitude, longitude})
}

const onEnd = () => prisma.airport.createMany({data: airports})

fs.createReadStream(path.resolve(__dirname, './seed_files/', fileName))
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", onData)
  .on("end", function () {
    console.log(`${fileName} loaded to memory`)
    onEnd().then(() => {
      console.log(`${fileName} saved to db`)
    })
  })
  .on("error", function (error) {
    console.log(error.message)
  })
