import { buildAirlinesModule } from "@/modules/airlines"
import { buildPrismaRepo } from "@/libs/prismaRepo/airlines/airlinePrismaRepo"
import { airlinesRoutes } from "@/libs/server/airlines/airlinesRoutes"

export const airlinesApp = airlinesRoutes(
  buildAirlinesModule(buildPrismaRepo())
)
