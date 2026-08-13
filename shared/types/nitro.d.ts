import type { ServerContainer } from '~~/server/di'

declare module 'nitropack/types' {
  interface NitroApp {
    container: ServerContainer
  }
}

export {}
