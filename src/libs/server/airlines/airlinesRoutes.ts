import { FastifyInstance } from "fastify"

import { buildAirlinesModule } from "@/modules/airlines"
import {
  badRequestWithMessage,
  idNotFound,
  replyCreated,
  replyOk,
  replyOkWithMessage,
} from "@/libs/server/shared/replies"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z, { string } from "zod"
import {
  newAirlineSchema,
  publicAirlineSchema,
  updateAirlineSchema,
} from "@/libs/server/airlines/schemas"

export const airlinesRoutes = (
  airlinesModule: ReturnType<typeof buildAirlinesModule>
) => {
  return async function airlinesRoutes(server: FastifyInstance) {
    server.route({
      method: "GET",
      url: "/healthcheck",
      schema: {
        response: {
          200: z.object({
            status: z.enum(["ok"]),
          }),
        },
      },
      handler: async function () {
        return { status: "ok" }
      },
    })

    server.route({
      method: "GET",
      url: "/all",
      schema: {
        response: {
          200: z.array(publicAirlineSchema),
        },
      },
      handler(request, reply) {
        airlinesModule.listAirlines({
          payload: {},
          onSuccess: replyOk(reply),
          onError: badRequestWithMessage(reply),
        })
      },
    })

    server.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/",
      schema: {
        querystring: z.object({
          nextOffsetToken: z.string().nullable().default(null),
          limit: z.preprocess((input) => {
            const str = z.string().default("").parse(input)
            const num = parseInt(str)
            return isNaN(num) ? null : num
          }, z.number().nonnegative().default(10)),
        }),
        response: {
          200: z.object({
            airlines: z.array(publicAirlineSchema),
            next: z.object({
              start: z.string().nullable(),
            }),
          }),
        },
      },
      handler(req, reply) {
        airlinesModule.listAirlinesLimited({
          payload: {
            limit: req.query.limit,
            offsetToken: req.query.nextOffsetToken,
          },
          onError: badRequestWithMessage(reply),
          onSuccess: ({ airlines, nextOffsetToken }) => {
            reply.code(200).send({
              airlines,
              next: {
                start: nextOffsetToken,
              },
            })
          },
        })
      },
    })

    server.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/",
      schema: {
        body: newAirlineSchema,
        response: {
          201: publicAirlineSchema,
        },
      },
      handler(req, reply) {
        airlinesModule.addAirline({
          payload: {
            newAirline: req.body,
          },
          onSuccess: replyCreated(reply),
          onError: badRequestWithMessage(reply),
        })
      },
    })

    server.withTypeProvider<ZodTypeProvider>().route({
      method: "PUT",
      url: "/:uuid",
      schema: {
        params: z.object({
          uuid: string(),
        }),
        body: updateAirlineSchema,
        response: {
          200: z.object({
            message: z.literal("updated"),
          }),
          404: z.object({
            message: z.string().optional(),
          }),
        },
      },
      handler(req, reply) {
        airlinesModule.updateAirline({
          payload: {
            uuid: req.params.uuid,
            update: req.body,
          },
          onSuccess: replyOkWithMessage(reply, "updated"),
          onError: badRequestWithMessage(reply),
          onNotFound: idNotFound(reply),
        })
      },
    })

    server.withTypeProvider<ZodTypeProvider>().route({
      method: "DELETE",
      url: "/:uuid",
      schema: {
        params: z.object({
          uuid: z.string(),
        }),
        response: {
          200: z.object({
            message: z.literal("deleted"),
          }),
          404: z.object({
            message: z.string().optional(),
          }),
        },
      },
      handler(req, reply) {
        airlinesModule.deleteAirline({
          payload: { uuid: req.params.uuid },
          onSuccess: replyOkWithMessage(reply, "deleted"),
          onError: badRequestWithMessage(reply),
          onNotFound: idNotFound(reply),
        })
      },
    })
  }
}
