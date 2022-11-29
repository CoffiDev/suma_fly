import {
  AddAirlinesInterface,
  DeleteAirlineInterface,
  ListAirlinesInterface,
  UpdateAirlineInterface,
} from "@/modules/airlines/moduleInterface"
import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"
import { Airline, AirlineId, NewAirline } from "@/modules/airlines/types"

export const buildAirlinesModule = (services: AirlinesServicesInterface) => {
  const listAirlines: ListAirlinesInterface = async ({
    onSuccess,
    onError,
  }: {
    payload: {}
    onSuccess: (airlines: Airline[]) => void
    onError: (e: Error) => void
  }) => {
    try {
      const airlines = await services.queryAirlines()
      onSuccess(airlines)
    } catch (e: unknown) {
      console.log(e)
      onError(new Error("An error occurred. Try again latter."))
    }
  }

  const addAirline: AddAirlinesInterface = async ({
    onSuccess,
    onError,
    payload,
  }: {
    payload: {
      newAirline: NewAirline
    }
    onSuccess: (newAirline: Airline) => void
    onError: (e: Error) => void
  }) => {
    try {
      const createdAirline = await services.createAirline(payload.newAirline)
      console.log("new airline created: ", createdAirline.id)
      onSuccess(createdAirline)
    } catch (e: unknown) {
      console.log(e)
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
      id: AirlineId
    }
    onSuccess: () => void
    onError: (e: Error) => void
    onNotFound: (id: AirlineId) => void
  }) => {
    try {
      const { found } = await services.removeAirline(payload.id)

      if (found) {
        onSuccess()
      } else {
        onNotFound(payload.id)
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
      id: AirlineId
      update: Airline
    }
    onSuccess: (updatedAirline: Airline) => void
    onError: (e: Error) => void
    onNotFound: (id: AirlineId) => void
  }) => {
    try {
      const { found, airline } = await services.changeAirline(payload)

      if (found) {
        onSuccess(airline)
      } else {
        onNotFound(payload.id)
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
  }
}
