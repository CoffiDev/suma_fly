import { FastifyReply } from "fastify"

export const badRequestWithMessage = (reply: FastifyReply) => (e: Error) => {
  reply.code(500).send({ message: e.message })
}

export const idNotFound = (reply: FastifyReply) => (id: string) => {
  reply.code(404).send({ mes: `id ${id} not found` })
}
