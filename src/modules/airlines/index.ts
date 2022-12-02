import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"
import {
  Airline,
  AirlineUpdate,
  AirlineUUID,
  NewAirline,
  PublicAirline,
} from "@/modules/airlines/types"

export const buildAirlinesModule = (services: AirlinesServicesInterface) => {
  const listAirlines = async ({
    onSuccess,
    onError,
  }: {
    payload: {}
    onSuccess: (airlines: PublicAirline[]) => void
    onError: (e: Error) => void
  }) => {
    try {
      const airlines = await services.queryAirlines()
      onSuccess(airlines)
    } catch (e: unknown) {
      onError(new Error("An error occurred. Try again latter."))
    }
  }

  const listAirlinesLimited = async ({
    payload,
    onSuccess,
    onError,
  }: {
    payload: {
      limit: number
      offsetToken: string | null
    }
    onSuccess: (response: {
      airlines: PublicAirline[]
      nextOffsetToken: string | null
    }) => void
    onError: (e: Error) => void
  }) => {
    try {
      const { rows: airlines, nextOffsetToken } =
        await services.queryAirlinesLimited(payload.limit, payload.offsetToken)
      onSuccess({ airlines, nextOffsetToken })
    } catch (e: unknown) {
      onError(new Error("An error occurred"))
    }
  }

  const addAirline = async ({
    onSuccess,
    onError,
    payload,
  }: {
    payload: {
      newAirline: NewAirline
    }
    onSuccess: (newAirline: PublicAirline) => void
    onError: (e: Error) => void
  }) => {
    try {
      const createdAirline = await services.createAirline(payload.newAirline)
      onSuccess(createdAirline)
    } catch (e: unknown) {
      onError(new Error("An error occurred"))
    }
  }

  const deleteAirline = async ({
    payload,
    onNotFound,
    onSuccess,
    onError,
  }: {
    payload: {
      uuid: AirlineUUID
    }
    onSuccess: () => void
    onError: (e: Error) => void
    onNotFound: (id: AirlineUUID) => void
  }) => {
    try {
      const { found } = await services.removeAirline(payload.uuid)

      if (found) {
        onSuccess()
      } else {
        onNotFound(payload.uuid)
      }
    } catch (e: unknown) {
      console.log(e)
      onError(new Error("An error occurred"))
    }
  }

  const updateAirline = async ({
    payload,
    onSuccess,
    onError,
    onNotFound,
  }: {
    payload: {
      uuid: AirlineUUID
      update: AirlineUpdate
    }
    onSuccess: (updatedAirline: Airline) => void
    onError: (e: Error) => void
    onNotFound: (id: AirlineUUID) => void
  }) => {
    try {
      const { found, airline } = await services.changeAirline(payload)

      if (found) {
        onSuccess(airline)
      } else {
        onNotFound(payload.uuid)
      }
    } catch (e: unknown) {
      console.log(e)
      onError(new Error("An error occurred"))
    }
  }

  return {
    addAirline,
    updateAirline,
    deleteAirline,
    listAirlines,
    listAirlinesLimited,
  }
}
