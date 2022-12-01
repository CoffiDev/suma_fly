import {
  FastifyInstance,
  FastifyReply as Rep,
  FastifyRequest as Req,
} from "fastify"

import { buildAirlinesModule } from "@/modules/airlines"
import {
  badRequestWithMessage,
  idNotFound,
  replyCreated,
  replyOk,
  replyOkWithMessage,
} from "@/libs/server/shared/replies"
import { Airline, NewAirline } from "@/modules/airlines/types"

export const airlinesRoutes = (
  airlinesModule: ReturnType<typeof buildAirlinesModule>
) => {
  return async function airlinesRoutes(server: FastifyInstance) {
    server.get("/healthcheck", async function () {
      return { status: "ok" }
    })

    server.delete("/:uuid", (req: Req, reply: Rep) =>
      airlinesModule.deleteAirline({
        payload: { uuid: (req.params as any).uuid },
        onSuccess: replyOkWithMessage(reply, "deleted"),
        onError: badRequestWithMessage(reply),
        onNotFound: idNotFound(reply),
      })
    )

    server.put("/:uuid", (req: Req, reply: Rep) =>
      airlinesModule.updateAirline({
        payload: {
          uuid: (req.params as any).uuid,
          update: req.body as Airline,
        },
        onSuccess: replyOkWithMessage(reply, "updated"),
        onError: badRequestWithMessage(reply),
        onNotFound: idNotFound(reply),
      })
    )

    server.get("/", (req: Req, reply: Rep) =>
      airlinesModule.listAirlines({
        payload: {},
        onSuccess: replyOk(reply),
        onError: badRequestWithMessage(reply),
      })
    )

    server.post("/", (req: Req, reply: Rep) =>
      airlinesModule.addAirline({
        payload: {
          newAirline: req.body as NewAirline,
        },
        onSuccess: replyCreated(reply),
        onError: badRequestWithMessage(reply),
      })
    )
  }
}
