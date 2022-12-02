import {
  Airline,
  AirlineUpdate,
  AirlineUUID,
  NewAirline,
  PublicAirline,
} from "@/modules/airlines/types"
import { inMemoryRepo } from "@/libs/memoryRepo/core"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

export const buildMemoryRepo = (
  initialRepo: Airline[] = []
): Pick<
  AirlinesServicesInterface,
  | "createAirline"
  | "changeAirline"
  | "queryAirlines"
  | "removeAirline"
  | "queryAirlinesLimited"
> => {
  const repo = inMemoryRepo<Airline>(initialRepo)

  return {
    async changeAirline(params: { update: AirlineUpdate; uuid: AirlineUUID }) {
      const { found, item: airline } = await repo.update(
        params.uuid,
        params.update
      )

      if (found) {
        return { found, airline }
      } else {
        return { found, airline: null }
      }
    },
    createAirline(airline: NewAirline): Promise<Airline> {
      return repo.create(airline)
    },
    async queryAirlines(): Promise<PublicAirline[]> {
      const result = await repo.getAll()
      return result.map((result) => {
        const { id, ...airline } = result
        return airline
      })
    },
    removeAirline(airlineUUID: AirlineUUID): Promise<{ found: boolean }> {
      return repo.remove(airlineUUID)
    },
    async queryAirlinesLimited(limit) {
      const result = await repo.getAll()
      const rows = result
        .map((result) => {
          const { id, ...airline } = result
          return airline
        })
        .slice(0, limit)

      return { rows, nextOffsetToken: null }
    },
  }
}
