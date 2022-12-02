import { FastifyReply } from "fastify"

export const badRequestWithMessage = (reply: FastifyReply) => (e: Error) => {
  reply.code(500).send({ message: e.message })
}

export const idNotFound = (reply: FastifyReply) => (id: string) => {
  reply.code(404).send({ message: `id ${id} not found` })
}

export const replyOk =
  <T>(reply: FastifyReply) =>
  (payload: T) => {
    reply.code(200).send(payload)
  }

export const replyOkWithMessage =
  <T>(reply: FastifyReply, message: string) =>
  (payload?: T) => {
    reply.code(200).send({ message })
  }

export const replyCreated =
  <T>(reply: FastifyReply) =>
  (payload: T) => {
    reply.code(201).send(payload)
  }
