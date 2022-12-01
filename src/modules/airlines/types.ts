export type Airline = {
  id: number
  uuid: string
  iataCode: string
  airline: string
}

export type NewAirline = Omit<Airline, "id" | "uuid">

export type AirlineUpdate = Partial<Omit<Airline, "id" | "uuid">>

export type PublicAirline = Omit<Airline, "id">

export type AirlineUUID = Airline["uuid"]
