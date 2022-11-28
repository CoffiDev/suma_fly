import { FastifyReply, FastifyRequest } from "fastify"
import {
  listAirlines,
  addAirline,
  deleteAirlines,
  updateAirline,
  type ListAirlinesInterface,
  type AddAirlinesInterface,
  type DeleteAirlineInterface,
  type UpdateAirlineInterface,
} from "@/modules/airlines"
import { Airline } from "@/modules/airlines/types"
import { badRequestWithMessage } from "@/libs/server/shared/replies"
import { idNotFound } from "@/libs/server/shared/replies"

const airlines: Airline[] = [
  {
    id: "1",
    iata_code: "UA",
    airline: "United Air Lines Inc.",
  },
]

export const getAirlines = async (req: FastifyRequest, reply: FastifyReply) => {
  const deps: ListAirlinesInterface = {
    onSuccess: (airlines) => {
      reply.send(airlines)
    },
    onError: badRequestWithMessage(reply),
    queryAirlines: async () => {
      return airlines
    },
  }

  listAirlines(deps)
}

export const postAirline = async (req: FastifyRequest, reply: FastifyReply) => {
  const deps: AddAirlinesInterface = {
    onSuccess: (airlines) => {
      reply.code(201).send(airlines)
    },
    onError: badRequestWithMessage(reply),
    createAirline: async (airline) => {
      const id = Math.random().toString()
      const n = { ...airline, id }
      airlines.push(n)
      return n
    },
  }

  addAirline(deps, req.body as any)
}

export const deleteAirline = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const deps: DeleteAirlineInterface = {
    onSuccess: () => {
      reply.code(200)
    },
    onError: badRequestWithMessage(reply),
    onNotFound: idNotFound(reply),
    removeAirline: async (id) => {
      const a = airlines.findIndex(({ id: aid }) => id === aid)

      if (a < 0) {
        return { found: false }
      } else {
        airlines.splice(a, 1)
        return { found: true }
      }
    },
  }

  deleteAirlines(deps, (req.params as any).id)
}

export const putAirline = async (req: FastifyRequest, reply: FastifyReply) => {
  const deps: UpdateAirlineInterface = {
    onSuccess: (airline) => {
      reply.code(200).send({ message: "updated", update: airline })
    },
    onError: badRequestWithMessage(reply),
    onNotFound: idNotFound(reply),
    changeAirline: async ({ id, update: airline }) => {
      const a = airlines.findIndex(({ id: aid }) => id === aid)

      if (a < 0) {
        return { found: false, airline }
      } else {
        airlines[a] = { ...airlines[a], ...airline }
        return { found: true, airline }
      }
    },
  }

  updateAirline(deps, { update: req.body as any, id: (req.params as any).id })
}
