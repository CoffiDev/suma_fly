import Fastify, { FastifyServerOptions } from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

function buildServer(
  baseConfig: FastifyServerOptions = {
    logger: true,
  }
) {
  const server = Fastify(baseConfig)

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  return server
}

export default buildServer
