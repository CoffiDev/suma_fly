import { Airline, AirlineUUID, NewAirline, PublicAirline } from "@/modules/airlines/types";
import { inMemoryRepo } from "@/libs/inMemoryRepo"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

export const buildMockService = (
  initialRepo: Airline[] = []
): AirlinesServicesInterface => {
  const repo = inMemoryRepo<Airline>(initialRepo)

  return {
    async changeAirline(params: { update: Airline; uuid: AirlineUUID }) {
      const { found, item: airline } = await repo.update(
        params.uuid,
        params.update
      )

      if (found) {
        return { airline, found }
      } else {
        return { found, airline: null }
      }
    },
    createAirline(airline: NewAirline): Promise<Airline> {
      return repo.create(airline)
    },
    async queryAirlines(): Promise<PublicAirline[]> {
      const result = await repo.getAll()
      return result.map(result => {
        const {id, ...airline} = result
        return airline
      })
    },
    removeAirline(airlineUUID: AirlineUUID): Promise<{ found: boolean }> {
      return repo.remove(airlineUUID)
    },
  }
}
