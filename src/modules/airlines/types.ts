export type Airline = {
  id: string
  iata_code: string
  airline: string
}

export type NewAirline = Omit<Airline, "id">

export type AirlineId = Airline["id"]
