export const useAppStore = defineStore('app', () => {
  const { app } = useAppConfig()

  const state = reactive({
    name: app.name,
    version: app.version,
  })

  return {
    state,
  }
})
