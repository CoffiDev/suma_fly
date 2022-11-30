import fs from "fs"
import path from "path"
import {parse} from "csv-parse"

import { PrismaClient, Airlines } from "@prisma/client"

const prisma = new PrismaClient()

const airlines: Pick<Airlines, "iataCode" | "airline">[] = []

const fileName = 'airlines.csv'

const onData = (row: any) => {
  const [iataCode, airline] = row
  airlines.push({iataCode, airline})
}

const onEnd = () => prisma.airlines.createMany({data: airlines})

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
