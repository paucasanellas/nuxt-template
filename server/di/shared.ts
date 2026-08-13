import { asClass } from 'awilix'

import { Clock } from '~~/server/contexts/shared/clock/Clock'
import { Config } from '~~/server/contexts/shared/config/Config'

export const shared = {
  clock: asClass(Clock).singleton(),
  config: asClass(Config).singleton(),
}
