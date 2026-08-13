import { setResponseHeader } from 'h3'

import type { HealthChecker } from '~~/server/contexts/health/application/HealthChecker'
import { toHealthResponse } from '~~/server/contexts/health/ui/HealthResponseMapper'
import type { HealthResponse } from '~~/shared/types/health'
import type { ServerEvent } from '~~/shared/types/server'

interface Dependencies {
  healthChecker: HealthChecker
}

export class NitroGetHealthController {
  private readonly healthChecker: HealthChecker

  constructor({ healthChecker }: Dependencies) {
    this.healthChecker = healthChecker
  }

  run(event: ServerEvent): HealthResponse {
    setResponseHeader(event, 'cache-control', 'no-store')

    return toHealthResponse(this.healthChecker.check())
  }
}
