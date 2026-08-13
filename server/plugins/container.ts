import { createServerContainer } from '~~/server/di'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.container = createServerContainer()
})
