import Fastify, { FastifyServerOptions } from "fastify"

function buildServer(
  baseConfig: FastifyServerOptions = {
    logger: true,
  }
) {
  const server = Fastify(baseConfig)

  return server
}

export default buildServer
