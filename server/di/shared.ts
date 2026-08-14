import { asClass } from 'awilix'

import { NitroRuntimeConfig } from '~~/server/contexts/shared/config/infrastructure/providers/NitroRuntimeConfig'

export const shared = {
  config: asClass(NitroRuntimeConfig).singleton(),
}
