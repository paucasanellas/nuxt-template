import type { Health } from '~~/server/contexts/health/domain/Health'
import type { HealthProvider } from '~~/server/contexts/health/domain/HealthProvider'

export class NitroHealthProvider implements HealthProvider {
  async check(): Promise<Health> {
    return {
      status: 'ok',
    }
  }
}
