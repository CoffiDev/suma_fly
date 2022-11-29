import fs from "fs"
import {parse} from "csv-parse"

import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient()

let counter = 0

fs.createReadStream("/Users/m/Downloads/archive/flights.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    // console.log(row);
    console.log(row["FLIGHT_NUMBER"], counter)
    counter = counter + 1


  })
  .on("end", function () {
    console.log("finished")
  })
  .on("error", function (error) {
    console.log(error.message)
  })
