import {
  Airline,
  AirlineUpdate,
  AirlineUUID,
  NewAirline,
  PublicAirline,
} from "@/modules/airlines/types"

export type AirlinesServicesInterface = {
  queryAirlines: () => Promise<PublicAirline[]>

  queryAirlinesLimited: (
    limit: number,
    offsetToken: string | null
  ) => Promise<{ rows: PublicAirline[]; nextOffsetToken: string | null }>

  createAirline: (airline: NewAirline) => Promise<Airline>

  removeAirline: (airlineId: AirlineUUID) => Promise<{ found: boolean }>

  changeAirline: (params: {
    update: AirlineUpdate
    uuid: AirlineUUID
  }) => Promise<
    { found: true; airline: Airline } | { found: false; airline: null }
  >
}

/*
Available built-in reporters: classic doc dot dump json
                         jsonstream landing list markdown min nyan progress
                         silent spec tap xunit base specy terse

 */
