export type Airline = {
  id: string
  iataCode: string
  airline: string
}

export type NewAirline = Omit<Airline, "id">

export type AirlineId = Airline["id"]
