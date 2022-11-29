import { buildApp } from "./app"

const PORT = 3000

const HOST = "0.0.0.0"

const server = buildApp()

async function main() {
  try {
    await server.listen(PORT, HOST)

    console.log(`Server ready at http://${HOST}:${PORT}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()