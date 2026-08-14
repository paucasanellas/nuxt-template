import { setResponseHeader } from 'h3'

import type { HealthChecker } from '~~/server/contexts/health/application/check/HealthChecker'

import type { Config } from '~~/server/contexts/shared/config/domain/Config'

interface Dependencies {
  healthChecker: HealthChecker
  config: Config
}

export class HealthHttpGetController {
  private readonly healthChecker: HealthChecker
  private readonly config: Config

  constructor({ healthChecker, config }: Dependencies) {
    this.healthChecker = healthChecker
    this.config = config
  }

  async run(event: ServerEvent): Promise<GetHealthResponse> {
    setResponseHeader(event, 'cache-control', 'no-store')

    const health = await this.healthChecker.check()

    return {
      status: health.status,
      version: this.config.version,
    }
  }
}
