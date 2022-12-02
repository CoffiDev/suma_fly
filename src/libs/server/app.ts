import baseApp from "@/libs/server/shared/baseApp"
import { airlinesApp } from "@/libs/server/airlines/airlinesApp"
import fastifySwagger from "@fastify/swagger"
// @ts-ignore
import fastifySwaggerUI from "@fastify/swagger-ui"
import { jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"

export function buildApp() {
  const app = baseApp()

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Suma Fly API",
        description: "Fly api service",
        version: "1.0.0",
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  })

  app.register(fastifySwaggerUI, {
    routePrefix: "/documentation",
  })

  app.after(() => {
    app.route({
      method: "GET",
      url: "/healthcheck",
      schema: {
        response: {
          200: z.object({
            status: z.string(),
          }),
        },
      },
      handler: async function () {
        return { status: "ok" }
      },
    })

    app.register(airlinesApp, { prefix: "/api/airlines" })
  })

  return app
}
