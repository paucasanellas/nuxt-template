import type { HealthReport } from '~~/server/contexts/health/domain/Health'

import type { Config } from '~~/server/contexts/shared/config/Config'

interface Dependencies {
  config: Config
}

export class HealthChecker {
  private readonly config: Config

  constructor({ config }: Dependencies) {
    this.config = config
  }

  check(): HealthReport {
    return {
      status: 'ok',
      version: this.config.version(),
    }
  }
}
