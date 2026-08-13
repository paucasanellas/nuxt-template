import { asClass } from 'awilix'

import { HealthChecker } from '~~/server/contexts/health/application/HealthChecker'
import { HealthGetController } from '~~/server/contexts/health/ui/HealthGetController'

export const health = {
  healthChecker: asClass(HealthChecker).singleton(),
  healthGetController: asClass(HealthGetController).singleton(),
}
