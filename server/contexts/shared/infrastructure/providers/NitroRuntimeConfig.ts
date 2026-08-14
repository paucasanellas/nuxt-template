import type { Config } from '~~/server/contexts/shared/domain/Config'

export class NitroRuntimeConfig implements Config {
  private readonly runtimeConfig = useRuntimeConfig()

  public readonly version = this.runtimeConfig.public.version
}
