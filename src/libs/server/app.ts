import baseApp from "@/libs/server/shared/baseApp"
import { airlinesRoutes } from "./airlines/airlinesRoutes"
import { buildAirlinesModule } from "@/modules/airlines"
import { airlinesServices } from "@/libs/server/airlines/airlinesServices"

export function buildApp() {
  const app = baseApp()

  app.get("/healthcheck", async function () {
    return { status: "ok" }
  })

  const airlinesModule = buildAirlinesModule(airlinesServices)
  const airlinesPlugin = airlinesRoutes(airlinesModule)
  app.register(airlinesPlugin, { prefix: "/api/airlines" })

  return app
}
