import { Airline, AirlineId, NewAirline } from "@/modules/airlines/types"
import { inMemoryRepo } from "@/libs/inMemoryRepo"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

export const buildMockService = (
  initialRepo: Airline[] = []
): AirlinesServicesInterface => {
  const repo = inMemoryRepo<NewAirline>(initialRepo)

  return {
    async changeAirline(params: { update: Airline; id: AirlineId }) {
      const { found, item: airline } = await repo.update(
        params.id,
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
    queryAirlines(): Promise<Airline[]> {
      return repo.getAll()
    },
    removeAirline(airlineId: AirlineId): Promise<{ found: boolean }> {
      return repo.remove(airlineId)
    },
  }
}
