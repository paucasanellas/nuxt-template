export class Config {
  private readonly runtimeConfig = useRuntimeConfig()

  version() {
    return this.runtimeConfig.public.version
  }
}
