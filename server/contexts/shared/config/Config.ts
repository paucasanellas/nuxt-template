export class Config {
  private readonly runtimeConfig = useRuntimeConfig()

  version(): string {
    return this.runtimeConfig.public.version
  }
}
