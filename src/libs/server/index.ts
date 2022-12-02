import { buildApp } from "./app"

const PORT = 3001

const HOST = "0.0.0.0"

const server = buildApp()

async function main() {
  try {
    await server.ready()
    await server.listen(PORT, HOST)

    console.log(` --- Server running at http://${HOST}:${PORT}`)

    console.log(
      ` --- Documentation running at http://${HOST}:${PORT}/documentation`
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
