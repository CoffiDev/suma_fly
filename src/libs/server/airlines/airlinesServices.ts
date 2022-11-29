import { AirlinesServicesInterface } from "@/modules/airlines/servicesInterface"

import { buildMockService } from "@/libs/server/airlines/tests/airlineMockService"
import { buildPrismaRepo } from "@/libs/prismaRepo/airlines"

// export const airlinesServices: AirlinesServicesInterface = buildMockService([])
export const airlinesServices: AirlinesServicesInterface = buildPrismaRepo()
