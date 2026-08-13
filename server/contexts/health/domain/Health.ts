export type HealthStatus = 'ok' | 'degraded'

export interface HealthReport {
  status: HealthStatus
  checkedAt: string
  uptime: number
  version: string
}
