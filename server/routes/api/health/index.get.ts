export default defineEventHandler(() => {
  const { app: { version, name } } = useAppConfig()
  return {
    name,
    version,
    status: 200,
    message: 'All systems are operational.'
  }
})
