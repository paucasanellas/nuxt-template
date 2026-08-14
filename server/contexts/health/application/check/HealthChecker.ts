import type { Health } from '~~/server/contexts/health/domain/Health'
import type { HealthProvider } from '~~/server/contexts/health/domain/HealthProvider'

interface Dependencies {
  healthProvider: HealthProvider
}

export class HealthChecker {
  private readonly healthProvider: HealthProvider

  constructor({ healthProvider }: Dependencies) {
    this.healthProvider = healthProvider
  }

  check(): Promise<Health> {
    return this.healthProvider.check()
  }
}
