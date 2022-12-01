import { test, pass } from "tap"

import baseApp from "@/libs/server/shared/baseApp"
import { buildMockRoutes } from "@/libs/server/airlines/tests/airlineRoutesMockService"
import { Airline } from "@/modules/airlines/types"

pass("this is fine")

test("check healtheck", async (t) => {
  const app = baseApp({})

  app.register(buildMockRoutes([]), {
    prefix: "/api/airlines",
  })

  const response = await app.inject({
    method: "GET",
    url: "/api/airlines/healthcheck",
  })

  t.equal(response.statusCode, 200, "returns a status code of 200")
  t.same(response.json(), { status: "ok" }, "status ok")
})

test("list empty airlines", async (t) => {
  const app = baseApp({})

  app.register(buildMockRoutes([]), {
    prefix: "/api/airlines",
  })

  const response = await app.inject({
    method: "GET",
    url: "/api/airlines",
  })

  t.equal(response.statusCode, 200, "status 200")
  t.same(response.json(), [], "empty list")
})

test("list all airlines", async (t) => {
  const initialAirlines = [
    {
      id: 1,
      uuid: "random-uuid",
      iataCode: "UA",
      airline: "United Air Lines Inc.",
    },
  ]

  const app = baseApp({})

  app.register(buildMockRoutes(initialAirlines), {
    prefix: "/api/airlines",
  })

  const response = await app.inject({
    method: "GET",
    url: "/api/airlines",
  })

  t.equal(response.statusCode, 200, "status 200")
  t.same(response.json(), [
    {
      uuid: "random-uuid",
      iataCode: "UA",
      airline: "United Air Lines Inc.",
    },
  ], "no empty list, without id")
})

test("add new airline", async (t) => {
  const initialAirlines: Airline[] = []

  const app = baseApp({})

  app.register(buildMockRoutes(initialAirlines), {
    prefix: "/api/airlines",
  })

  const newAirline = {
    iataCode: "UA",
    airline: "United Air Lines Inc.",
  }

  const create = await app.inject({
    method: "POST",
    url: "/api/airlines",
    payload: newAirline,
  })

  const created = create.json()

  t.equal(create.statusCode, 201, "status 201")
  t.type(created.uuid, "string", "response has uuid")
  t.type(created.id, "number", "response has id number")

  const list = await app.inject({
    method: "GET",
    url: "/api/airlines",
  })

  t.equal(list.statusCode, 200, "status 200")
  t.same(list.json(), [{
    uuid: created.uuid,
    ...newAirline
  }], "empty list")
})
