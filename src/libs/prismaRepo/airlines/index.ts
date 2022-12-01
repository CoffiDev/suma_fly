import { PrismaClient, Prisma } from "@prisma/client"

import {
  Airline,
  AirlineUpdate,
  AirlineUUID,
  NewAirline,
} from "@/modules/airlines/types"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

const prisma = new PrismaClient()

const NotFoundPrismaErrorCode = "P2025"

export const buildPrismaRepo = (): Pick<
  AirlinesServicesInterface,
  "createAirline" | "changeAirline" | "queryAirlines" | "removeAirline"
> => {
  return {
    async changeAirline(params: { update: AirlineUpdate; uuid: AirlineUUID }) {
      try {
        const airline = await prisma.airlines.update({
          where: { uuid: params.uuid },
          data: params.update,
        })

        return { found: true, airline: airline }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === NotFoundPrismaErrorCode) {
            return { found: false, airline: null }
          }
        }
        throw e
      }
    },
    async createAirline(airline: NewAirline): Promise<Airline> {
      return await prisma.airlines.create({
        data: airline,
      })
    },
    async queryAirlines() {
      return await prisma.airlines.findMany({
        select: {
          uuid: true,
          id: false,
          airline: true,
          iataCode: true,
        },
      })
    },
    async removeAirline(airlineUUID: AirlineUUID): Promise<{ found: boolean }> {
      try {
        await prisma.airlines.delete({ where: { uuid: airlineUUID } })
        return { found: true }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === NotFoundPrismaErrorCode) {
            return { found: false }
          }
        }
        throw e
      }
    },
  }
}
