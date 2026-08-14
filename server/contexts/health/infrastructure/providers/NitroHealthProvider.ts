import type { Health } from '~~/server/contexts/health/domain/Health'
import type { HealthProvider } from '~~/server/contexts/health/domain/HealthProvider'

import type { Config } from '~~/server/contexts/shared/domain/Config'

interface Dependencies {
  config: Config
}

export class NitroHealthProvider implements HealthProvider {
  private readonly config: Config

  constructor({ config }: Dependencies) {
    this.config = config
  }

  async check(): Promise<Health> {
    return {
      status: 'ok',
      version: this.config.version,
    }
  }
}
