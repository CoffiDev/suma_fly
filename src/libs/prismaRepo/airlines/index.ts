import { PrismaClient, Prisma } from "@prisma/client"

import { Airline, AirlineId, NewAirline } from "@/modules/airlines/types"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

const prisma = new PrismaClient()

export const buildPrismaRepo = (): Pick<
  AirlinesServicesInterface,
  "createAirline" | "changeAirline" | "queryAirlines" | "removeAirline"
> => {
  return {
    async changeAirline(params: { update: Airline; id: AirlineId }) {
      try {
        console.log("wuuut", params.update, params.id)

        const airline = await prisma.airlines.update({
          where: { id: parseInt(params.id) },
          data: params.update,
        })

        return { found: true, airline: {} as any }
      } catch (e) {
        console.log(e)

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
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
      return await prisma.airlines.findMany()
    },
    async removeAirline(airlineId: AirlineId): Promise<{ found: boolean }> {
      try {
        await prisma.airlines.delete({ where: { id: parseInt(airlineId) } })
        return { found: true }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            return { found: false }
          }
        }
        throw e
      }
    },
  }
}
