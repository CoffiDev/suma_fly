import { FastifyInstance } from "fastify"

import { airlinesControllers } from "./airlinesControllers"
import { buildAirlinesModule } from "@/modules/airlines"

export const airlinesRoutes = (
  airlinesModule: ReturnType<typeof buildAirlinesModule>
) => {
  const controllers = airlinesControllers(airlinesModule)

  return async function airlinesRoutes(server: FastifyInstance) {
    server.get("/healthcheck", async function () {
      return { status: "ok" }
    })

    server.delete("/:id", controllers.deleteAirline)
    server.put("/:id", controllers.putAirline)

    server.get("/", controllers.getAirlines)
    server.post("/", controllers.postAirline)
  }
}
