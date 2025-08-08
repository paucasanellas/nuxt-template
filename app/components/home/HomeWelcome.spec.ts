import { HomeWelcome } from '#components'
import { render, screen } from '@@/tests/utils/nuxt'

describe('Component: HomeWelcome', () => {
  it('should see welcome message', async () => {
    const { app: { name } } = useAppConfig()

    await renderComponent()

    const title = screen.getByRole('heading', { level: 1, name: `Welcome to ${name}` })
    expect(title).toBeInTheDocument()
  })

  it('should see an actual template version', async () => {
    const { app: { version: expectedVersion } } = useAppConfig()

    await renderComponent()

    const version = screen.getByLabelText('Actual template version')
    expect(version).toBeInTheDocument()
    expect(version.textContent).toStrictEqual(expectedVersion)
  })
})

async function renderComponent() {
  await render(HomeWelcome)
}
