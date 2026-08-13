import type { HealthReport } from '~~/server/contexts/health/domain/Health'
import type { HealthResponse } from '~~/shared/types/health'

export function toHealthResponse(report: HealthReport): HealthResponse {
  return {
    status: report.status,
    checkedAt: report.checkedAt.toISOString(),
    uptime: report.uptime,
    version: report.version,
  }
}
