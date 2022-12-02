import { implement } from "@/libs/utils/types"
import {
  AirlineUpdate,
  NewAirline,
  PublicAirline,
} from "@/modules/airlines/types"
import z from "zod"

export const publicAirlineSchema = implement<PublicAirline>().with({
  uuid: z.string(),
  iataCode: z.string(),
  airline: z.string(),
})

export const newAirlineSchema = implement<NewAirline>().with({
  iataCode: z.string(),
  airline: z.string(),
})

export const updateAirlineSchema = implement<AirlineUpdate>().with({
  iataCode: z.string().optional(),
  airline: z.string().optional(),
})
