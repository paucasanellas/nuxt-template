export type HealthStatus = 'ok' | 'degraded'

export interface HealthResponse {
  status: HealthStatus
  checkedAt: string
  uptime: number
  version: string
}
