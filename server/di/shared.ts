import { asClass } from 'awilix'

import { NitroRuntimeConfig } from '~~/server/contexts/shared/infrastructure/providers/NitroRuntimeConfig'

export const shared = {
  config: asClass(NitroRuntimeConfig).singleton(),
}
