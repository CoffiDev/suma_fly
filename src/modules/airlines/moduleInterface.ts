import { Airline, AirlineId, NewAirline } from "@/modules/airlines/types"

export type ListAirlinesInterface = (params: {
  payload: {}
  onSuccess: (airlines: Airline[]) => void
  onError: (e: Error) => void
}) => Promise<void>

export type AddAirlinesInterface = (params: {
  payload: {
    newAirline: NewAirline
  }
  onSuccess: (newAirline: Airline) => void
  onError: (e: Error) => void
}) => Promise<void>

export type DeleteAirlineInterface = (params: {
  payload: {
    id: AirlineId
  }
  onSuccess: () => void
  onError: (e: Error) => void
  onNotFound: (id: AirlineId) => void
}) => Promise<void>

export type UpdateAirlineInterface = (params: {
  payload: {
    id: AirlineId
    update: Airline
  }
  onSuccess: (updatedAirline: Airline) => void
  onError: (e: Error) => void
  onNotFound: (id: AirlineId) => void
}) => Promise<void>
