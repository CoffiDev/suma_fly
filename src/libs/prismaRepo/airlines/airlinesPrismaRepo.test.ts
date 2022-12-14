import path from "path"
import * as dotenv from "dotenv"
import * as process from "process"
dotenv.config({
  path: path.join(process.cwd(), "./env.test"),
})

import { test, beforeEach } from "tap"
import { buildPrismaRepo } from "@/libs/prismaRepo/airlines/airlinePrismaRepo"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const repo = buildPrismaRepo()

beforeEach(async () => {
  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Airlines" CASCADE;`)
    // console.log("---- truncated table")
  } catch (error) {
    console.log({ error })
  }
})

test("repo", async (t) => {
  t.test("queryAirlines", async (t) => {
    t.test("empty repo", async (t) => {
      const result = await repo.queryAirlines()

      t.same(result, [], "empty result")
    })

    t.test("with new record", async (t) => {
      const data = {
        iataCode: "dummyCode",
        airline: "dummyAirline",
      }

      const createdAirline = await prisma.airlines.create({ data })

      const result = await repo.queryAirlines()

      t.same(
        result,
        [
          {
            ...data,
            uuid: createdAirline.uuid,
          },
        ],
        "query has one result with required fields"
      )
    })
  })

  t.test("queryAirlinesLimited", async (t) => {
    await prisma.airlines.createMany({
      data: Array(25)
        .fill(0)
        .map((x, i) => ({ airline: "some" + i, iataCode: "some" })),
    })

    const page1 = await repo.queryAirlinesLimited(10, null)
    t.equal(page1.rows.length, 10, "page 1 has limit len")
    t.match(page1.nextOffsetToken, String, "next token is sting")

    const page2 = await repo.queryAirlinesLimited(10, page1.nextOffsetToken)
    t.equal(page2.rows.length, 10, "page 2 has limit len")
    t.match(page2.nextOffsetToken, String, "next token is sting")

    const page3 = await repo.queryAirlinesLimited(10, page2.nextOffsetToken)
    t.equal(page3.rows.length, 5, "page 2 has remaining len")
    t.equal(page3.nextOffsetToken, null, "next token is null")
  })

  t.test("createAirline", async (t) => {
    t.test("create an airline", async (t) => {
      const newAirline = {
        iataCode: "code",
        airline: "sample airline",
      }

      const createdAirline = await repo.createAirline(newAirline)

      t.match(createdAirline, {
        id: Number,
        uuid: String,
        iataCode: newAirline.iataCode,
        airline: newAirline.airline,
      })
    })
  })

  t.test("removeAirline", async (t) => {
    t.test("remove an existing airline", async (t) => {
      const data = {
        iataCode: "dummyCode",
        airline: "dummyAirline",
      }

      const createdAirline = await prisma.airlines.create({ data })

      const { found } = await repo.removeAirline(createdAirline.uuid)

      t.equal(found, true, "found for deletion")

      const removed = await prisma.airlines.findUnique({
        where: {
          uuid: createdAirline.uuid,
        },
      })

      t.equal(removed, null, "airline deleted")
    })

    t.test("remove unexisting airline", async (t) => {
      const { found } = await repo.removeAirline("random uuid")
      t.equal(found, false, "found is false")
    })
  })

  t.test("changeAirline", async (t) => {
    t.test("change existing airline", async (t) => {
      const data = {
        iataCode: "dummyCode",
        airline: "dummyAirline",
      }

      const createdAirline = await prisma.airlines.create({ data })

      const update = {
        iataCode: "newCode",
        airline: "newAirline",
      }

      const { found, airline } = await repo.changeAirline({
        uuid: createdAirline.uuid,
        update: update,
      })

      t.equal(found, true, "found for update")
      t.match(airline, update, "update retrieved")
    })

    t.test("change unexisting airline", async (t) => {
      const update = {
        iataCode: "newCode",
        airline: "newAirline",
      }

      const { found, airline } = await repo.changeAirline({
        uuid: "some uuid",
        update: update,
      })

      t.equal(found, false, "not found for update")
      t.equal(airline, null, "update is null")
    })
  })
}).then(() => console.log("done"))
