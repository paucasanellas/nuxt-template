import { setResponseHeader } from 'h3'

import type { HealthChecker } from '~~/server/contexts/health/application/check/HealthChecker'

interface Dependencies {
  healthChecker: HealthChecker
}

export class HealthHttpGetController {
  private readonly healthChecker: HealthChecker

  constructor({ healthChecker }: Dependencies) {
    this.healthChecker = healthChecker
  }

  run(event: ServerEvent): Promise<GetHealthResponse> {
    setResponseHeader(event, 'cache-control', 'no-store')

    return this.healthChecker.check()
  }
}
