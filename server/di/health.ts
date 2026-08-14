import { asClass } from 'awilix'

import { HealthChecker } from '~~/server/contexts/health/application/check/HealthChecker'
import { HealthHttpGetController } from '~~/server/contexts/health/infrastructure/http/HealthHttpGetController'
import { NitroHealthProvider } from '~~/server/contexts/health/infrastructure/providers/NitroHealthProvider'

export const health = {
  healthProvider: asClass(NitroHealthProvider).singleton(),
  healthChecker: asClass(HealthChecker).singleton(),
  healthHttpGetController: asClass(HealthHttpGetController).singleton(),
}
