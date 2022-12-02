import { test } from "tap"

import baseApp from "@/libs/server/shared/baseApp"
import { Airline } from "@/modules/airlines/types"
import { airlinesRoutes } from "@/libs/server/airlines/airlinesRoutes"
import { buildAirlinesModule } from "@/modules/airlines"
import { buildMemoryRepo } from "@/libs/memoryRepo/airlines/airlineMemoryRepo"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

const mockRepo: AirlinesServicesInterface = {
  queryAirlines: async () => [],
  createAirline: async () => {
    return { airline: "some", iataCode: "some", id: 1, uuid: "some" }
  },
  changeAirline: async (_update) => {
    return { found: false, airline: null }
  },
  removeAirline: async (_id) => {
    return { found: false }
  },
}

const buildMockApp = (initialRepo: Airline[] = []) => {
  return airlinesRoutes(buildAirlinesModule(buildMemoryRepo(initialRepo)))
}

const registerConfig = {
  prefix: "/api/airlines",
}

test("GET /healtheck", async (t) => {
  const app = baseApp({})

  app.register(buildMockApp([]), {
    prefix: "/api/airlines",
  })

  const response = await app.inject({
    method: "GET",
    url: "/api/airlines/healthcheck",
  })

  t.equal(response.statusCode, 200, "returns a status code of 200")
  t.same(response.json(), { status: "ok" }, "status ok")
})

test("GET /all", async (t) => {
  t.test("list empty airlines", async (t) => {
    const app = baseApp({})

    app.register(
      airlinesRoutes(
        buildAirlinesModule({
          ...mockRepo,
          queryAirlines: async () => [],
        })
      ),
      registerConfig
    )

    const response = await app.inject({
      method: "GET",
      url: "/api/airlines/all",
    })

    t.equal(response.statusCode, 200, "status 200")
    t.same(response.json(), [], "empty list")
  })

  t.test("list all airlines", async (t) => {
    const initialAirlines = [
      {
        id: 1,
        uuid: "random-uuid",
        iataCode: "UA",
        airline: "United Air Lines Inc.",
      },
    ]

    const app = baseApp({})

    app.register(
      airlinesRoutes(
        buildAirlinesModule({
          ...mockRepo,
          queryAirlines: async () => initialAirlines,
        })
      ),
      registerConfig
    )

    const response = await app.inject({
      method: "GET",
      url: "/api/airlines/all",
    })

    t.equal(response.statusCode, 200, "status 200")
    t.same(
      response.json(),
      [
        {
          uuid: "random-uuid",
          iataCode: "UA",
          airline: "United Air Lines Inc.",
        },
      ],
      "no empty list, without id"
    )
  })
})

test("POST /", async (t) => {
  t.test("add new airline", async (t) => {
    const initialAirlines: Airline[] = []

    const app = baseApp({})

    app.register(buildMockApp(initialAirlines), {
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

    const list = await app.inject({
      method: "GET",
      url: "/api/airlines/all",
    })

    t.equal(list.statusCode, 200, "status 200")
    t.same(
      list.json(),
      [
        {
          uuid: created.uuid,
          ...newAirline,
        },
      ],
      "empty list"
    )
  })

  t.test("invalid schemas", async (t) => {
    const app = baseApp({})
    app.register(buildMockApp([]), registerConfig)

    const createEmpty = await app.inject({
      method: "POST",
      url: "/api/airlines",
      payload: {},
    })
    t.equal(createEmpty.statusCode, 400, "invalid empty obj")

    const createAirlineOnly = await app.inject({
      method: "POST",
      url: "/api/airlines",
      payload: {
        airline: "some",
      },
    })
    t.equal(createAirlineOnly.statusCode, 400, "invalid airline only")

    const createAirlineAsNumber = await app.inject({
      method: "POST",
      url: "/api/airlines",
      payload: {
        airline: 1,
      },
    })
    t.equal(createAirlineAsNumber.statusCode, 400, "invalid airline as number")
  })
})

test("PUT /:uuid", async (t) => {
  t.test("update existing airline", async (t) => {
    const app = baseApp({})
    app.register(
      buildMockApp([
        {
          id: 1,
          uuid: "67e1f6c2-197a-4452-a5b0-7406dcd0745e",
          airline: "some airline",
          iataCode: "some code",
        },
      ]),
      registerConfig
    )

    const update = await app.inject({
      method: "PUT",
      url: "/api/airlines/67e1f6c2-197a-4452-a5b0-7406dcd0745e",
      payload: {
        airline: "new airline name",
        iataCode: "new iata code",
      },
    })
    t.equal(update.statusCode, 200, "status is 200")
    t.same(update.json(), { message: "updated" }, "message is updated")

    const updateNoFields = await app.inject({
      method: "PUT",
      url: "/api/airlines/67e1f6c2-197a-4452-a5b0-7406dcd0745e",
      payload: {},
    })

    t.equal(updateNoFields.statusCode, 200, "update no fields status is 200")
  })

  t.test("update non-existing airline", async (t) => {
    const app = baseApp({})
    app.register(
      buildMockApp([
        {
          id: 1,
          uuid: "67e1f6c2-197a-4452-a5b0-7406dcd0745e",
          airline: "some airline",
          iataCode: "some code",
        },
      ]),
      registerConfig
    )

    const update = await app.inject({
      method: "PUT",
      url: "/api/airlines/67e1f6c2-197a-4452-a5b0-7406dcd11111",
      payload: {
        airline: "new airline name",
        iataCode: "new iata code",
      },
    })

    t.equal(update.statusCode, 404, "status is 404")
    t.match(update.json(), { message: String })
  })

  t.test("invalid schemas", async (t) => {
    const app = baseApp({})
    app.register(
      buildMockApp([
        {
          id: 1,
          uuid: "67e1f6c2-197a-4452-a5b0-7406dcd0745e",
          airline: "some airline",
          iataCode: "some code",
        },
      ]),
      registerConfig
    )

    const update = await app.inject({
      method: "PUT",
      url: "/api/airlines/67e1f6c2-197a-4452-a5b0-7406dcd0745e",
      payload: {
        airline: 1,
      },
    })

    t.equal(
      update.statusCode,
      400,
      "update airlines as number is  status is 400"
    )
    t.match(update.json(), { message: String }, "contains error message")
  })
})

test("Delete /:uuid", async (t) => {
  t.test("delete existing airline", async (t) => {
    const app = baseApp({})
    app.register(
      buildMockApp([
        {
          id: 1,
          uuid: "67e1f6c2-197a-4452-a5b0-7406dcd0745e",
          airline: "some airline",
          iataCode: "some code",
        },
      ]),
      registerConfig
    )

    const update = await app.inject({
      method: "DELETE",
      url: "/api/airlines/67e1f6c2-197a-4452-a5b0-7406dcd0745e",
    })
    t.equal(update.statusCode, 200, "status is 200")
    t.same(update.json(), { message: "deleted" }, "message is deleted")
  })

  t.test("delete non existing airline", async (t) => {
    const app = baseApp({})
    app.register(
      buildMockApp([
        {
          id: 1,
          uuid: "67e1f6c2-197a-4452-a5b0-7406dcd0745e",
          airline: "some airline",
          iataCode: "some code",
        },
      ]),
      registerConfig
    )

    const update = await app.inject({
      method: "DELETE",
      url: "/api/airlines/67e1f6c2-197a-4452-a5b0-7406dcd11111",
    })

    t.equal(update.statusCode, 404, "status is 404")
    t.match(update.json(), { message: String }, "json contains message")
  })
})
