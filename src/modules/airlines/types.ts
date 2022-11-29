export type Airline = {
  id: number
  iataCode: string
  airline: string
}

export type NewAirline = Omit<Airline, "id">

export type AirlineId = Airline["id"]
