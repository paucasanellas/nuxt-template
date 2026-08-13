import { setResponseHeader } from 'h3'

import type { HealthChecker } from '~~/server/contexts/health/application/HealthChecker'

interface Dependencies {
  healthChecker: HealthChecker
}

export class HealthGetController {
  private readonly healthChecker: HealthChecker

  constructor({ healthChecker }: Dependencies) {
    this.healthChecker = healthChecker
  }

  run(event: ServerEvent): HealthResponse {
    setResponseHeader(event, 'cache-control', 'no-store')

    return this.healthChecker.check()
  }
}
