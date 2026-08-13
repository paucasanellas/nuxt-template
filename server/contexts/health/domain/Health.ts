export type HealthStatus = 'ok' | 'degraded'

export interface HealthReport {
  status: HealthStatus
  checkedAt: Date
  uptime: number
  version: string
}
