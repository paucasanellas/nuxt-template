import type { Health } from '~~/server/contexts/health/domain/Health'

export interface HealthProvider {
  check(): Promise<Health>
}
