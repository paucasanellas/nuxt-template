export const useAppStore = defineStore('app', () => {
  const { app: { name, version } } = useAppConfig()

  const state = reactive({
    name,
    version
  })

  return {
    state
  }
})
