import { createContainer } from 'awilix'
import { health } from '~~/server/di/health'
import { shared } from '~~/server/di/shared'

export function createServerContainer() {
  return createContainer({ strict: true })
    .register(shared)
    .register(health)
}

export type ServerContainer = ReturnType<typeof createServerContainer>
