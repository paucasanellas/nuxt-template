import { asClass } from 'awilix'
import { HealthChecker } from '~~/server/contexts/health/application/HealthChecker'
import { NitroGetHealthController } from '~~/server/contexts/health/ui/NitroGetHealthController'

export const health = {
  healthChecker: asClass(HealthChecker).singleton(),
  nitroGetHealthController: asClass(NitroGetHealthController).singleton(),
}
