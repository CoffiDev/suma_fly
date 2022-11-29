import { Airline } from "@/modules/airlines/types"
import { airlinesRoutes } from "@/libs/server/airlines/airlinesRoutes"
import { buildAirlinesModule } from "@/modules/airlines"
import { buildMockService } from "@/libs/server/airlines/tests/airlineMockService"

export const buildMockRoutes = (initialRepo: Airline[] = []) => {
  return airlinesRoutes(buildAirlinesModule(buildMockService(initialRepo)))
}
