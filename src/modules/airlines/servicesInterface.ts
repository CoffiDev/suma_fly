import { Airline, AirlineId, NewAirline } from "@/modules/airlines/types"

export type AirlinesServicesInterface = {
  queryAirlines: () => Promise<Airline[]>

  createAirline: (airline: NewAirline) => Promise<Airline>

  removeAirline: (airlineId: AirlineId) => Promise<{ found: boolean }>

  changeAirline: (params: {
    update: Airline
    id: AirlineId
  }) => Promise<
    { found: true; airline: Airline } | { found: false; airline: null }
  >
}
