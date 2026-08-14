import { asClass } from 'awilix'

import { Config } from '~~/server/contexts/shared/config/Config'

export const shared = {
  config: asClass(Config).singleton(),
}
