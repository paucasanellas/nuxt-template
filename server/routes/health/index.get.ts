export default defineEventHandler((event) => {
  const container = useServerContainer()

  const controller = container.resolve('healthGetController')

  return controller.run(event)
})
