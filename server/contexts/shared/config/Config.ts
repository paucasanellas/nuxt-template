export class Config {
  private readonly runtimeConfig = useRuntimeConfig()

  public readonly version = this.runtimeConfig.public.version
}
