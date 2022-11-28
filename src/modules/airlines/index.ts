import { Airline, AirlineId, NewAirline } from "./types"

export type ListAirlinesInterface = {
  onSuccess: (airlines: Airline[]) => void
  onError: (e: Error) => void
  queryAirlines: () => Promise<Airline[]>
}

export type AddAirlinesInterface = {
  onSuccess: (newAirline: Airline) => void
  onError: (e: Error) => void
  createAirline: (airline: NewAirline) => Promise<Airline>
}

export type DeleteAirlineInterface = {
  onSuccess: () => void
  onError: (e: Error) => void
  onNotFound: (id: AirlineId) => void
  removeAirline: (airlineId: AirlineId) => Promise<{ found: boolean }>
}

export type UpdateAirlineInterface = {
  onSuccess: (updatedAirline: Airline) => void
  onError: (e: Error) => void
  onNotFound: (id: AirlineId) => void
  changeAirline: (params: {
    update: Airline
    id: AirlineId
  }) => Promise<{ found: boolean; airline: Airline }>
}

export const listAirlines = async ({
  queryAirlines,
  onSuccess,
  onError,
}: ListAirlinesInterface) => {
  try {
    const airlines = await queryAirlines()
    onSuccess(airlines)
  } catch (e: unknown) {
    console.log(e)
    onError(new Error("An error occurred. Try again latter."))
  }
}

export const addAirline = async (
  { createAirline, onSuccess, onError }: AddAirlinesInterface,
  newAirline: NewAirline
) => {
  try {
    const createdAirline = await createAirline(newAirline)
    console.log("new airline created: ", createdAirline.id)
    onSuccess(createdAirline)
  } catch (e: unknown) {
    console.log(e)
    onError(new Error("An error occurred"))
  }
}

export const deleteAirlines = async (
  { removeAirline, onNotFound, onSuccess, onError }: DeleteAirlineInterface,
  airlineId: AirlineId
) => {
  try {
    const { found } = await removeAirline(airlineId)

    if (found) {
      onSuccess()
    } else {
      onNotFound(airlineId)
    }
  } catch (e: unknown) {
    console.log(e)
    onError(new Error("An error occurred"))
  }
}

export const updateAirline = async (
  { changeAirline, onSuccess, onError, onNotFound }: UpdateAirlineInterface,
  { update, id }: { update: Airline; id: AirlineId }
) => {
  try {
    const { found, airline } = await changeAirline({ update, id })

    if (found) {
      onSuccess(airline)
    } else {
      onNotFound(id)
    }
  } catch (e: unknown) {
    console.log(e)
    onError(new Error("An error occurred"))
  }
}
