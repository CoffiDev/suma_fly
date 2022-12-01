import baseApp from "@/libs/server/shared/baseApp"
import { airlinesApp } from "@/libs/server/airlines/airlinesApp"

export function buildApp() {
  const app = baseApp()

  app.get("/healthcheck", async function () {
    return { status: "ok" }
  })

  app.register(airlinesApp, { prefix: "/api/airlines" })

  return app
}
