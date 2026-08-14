import { asClass } from 'awilix'

import { HealthChecker } from '~~/server/contexts/health/application/check/HealthChecker'
import { HealthHttpGetController } from '~~/server/contexts/health/infrastructure/http/HealthHttpGetController'

export const health = {
  healthChecker: asClass(HealthChecker).singleton(),
  healthHttpGetController: asClass(HealthHttpGetController).singleton(),
}
