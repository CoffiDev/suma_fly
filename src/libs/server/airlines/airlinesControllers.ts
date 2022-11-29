import { FastifyReply, FastifyRequest } from "fastify"

import { Airline, NewAirline } from "@/modules/airlines/types"
import {
  badRequestWithMessage,
  replyCreated,
  replyOk,
  replyOkWithMessage,
} from "@/libs/server/shared/replies"
import { idNotFound } from "@/libs/server/shared/replies"
import { buildAirlinesModule } from "@/modules/airlines"

export const airlinesControllers = (
  airlinesModule: ReturnType<typeof buildAirlinesModule>
) => {
  const getAirlines = (req: FastifyRequest, reply: FastifyReply) => {
    airlinesModule.listAirlines({
      payload: {},
      onSuccess: replyOk(reply),
      onError: badRequestWithMessage(reply),
    })
  }

  const postAirline = (req: FastifyRequest, reply: FastifyReply) => {
    airlinesModule.addAirline({
      payload: {
        newAirline: req.body as NewAirline,
      },
      onSuccess: replyCreated(reply),
      onError: badRequestWithMessage(reply),
    })
  }

  const deleteAirline = (req: FastifyRequest, reply: FastifyReply) => {
    airlinesModule.deleteAirline({
      payload: { id: (req.params as any).id },
      onSuccess: replyOkWithMessage(reply, "deleted"),
      onError: badRequestWithMessage(reply),
      onNotFound: idNotFound(reply),
    })
  }

  const putAirline = (req: FastifyRequest, reply: FastifyReply) => {
    airlinesModule.updateAirline({
      payload: {
        id: (req.params as any).id,
        update: req.body as Airline,
      },
      onSuccess: replyOkWithMessage(reply, "updated"),
      onError: badRequestWithMessage(reply),
      onNotFound: idNotFound(reply),
    })
  }

  return {
    getAirlines,
    postAirline,
    deleteAirline,
    putAirline,
  }
}
