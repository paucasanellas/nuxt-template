export default defineEventHandler((event) => {
  const container = useServerContainer()

  const controller = container.resolve('healthHttpGetController')

  return controller.run(event)
})
