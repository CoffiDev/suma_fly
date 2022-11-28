import Fastify from "fastify"
import airlinesRoutes from "./airlines/airlinesRoutes"

function buildServer() {
  const server = Fastify({
    logger: true,
  })

  server.get("/healthcheck", async function () {
    return { status: "ok" }
  })

  server.register(airlinesRoutes, { prefix: "api/airlines" })

  return server
}

export default buildServer
