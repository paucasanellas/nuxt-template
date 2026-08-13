import type { HealthReport } from '~~/server/contexts/health/domain/Health'

import type { Clock } from '~~/server/contexts/shared/clock/Clock'
import type { Config } from '~~/server/contexts/shared/config/Config'

interface Dependencies {
  clock: Clock
  config: Config
}

export class HealthChecker {
  private readonly clock: Clock
  private readonly config: Config

  constructor({ clock, config }: Dependencies) {
    this.clock = clock
    this.config = config
  }

  check(): HealthReport {
    return {
      status: 'ok',
      checkedAt: this.clock.now().toISOString(),
      uptime: this.clock.uptimeSeconds(),
      version: this.config.version(),
    }
  }
}
