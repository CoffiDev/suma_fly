import { FastifyInstance } from "fastify"

import {
  deleteAirline,
  getAirlines,
  postAirline,
  putAirline,
} from "./airlinesControllers"

async function airlinesRoutes(server: FastifyInstance) {
  server.get("/", getAirlines)
  server.post("/", postAirline)
  server.delete("/:id", deleteAirline)
  server.put("/:id", putAirline)
}

export default airlinesRoutes
