import Fastify from "fastify"

const PORT = 8000

const server = Fastify({
  logger: true,
})

server.get("/healthcheck", async function () {
  return { status: "ok" }
})

async function main() {
  try {
    await server.listen({
      port: PORT,
      host: "0.0.0.0",
    })
    console.log(`\nServer ready - Listening on port ${PORT}\n`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
