import Fastify from "fastify"

function buildServer() {
  const server = Fastify({
    logger: true,
  })

  return server
}

export default buildServer
