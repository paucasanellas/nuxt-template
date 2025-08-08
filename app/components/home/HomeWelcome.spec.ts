import { HomeWelcome } from '#components'
import { render, screen } from '@@/tests/utils/nuxt'

describe('HomeWelcome', () => {
  it('renders the component', async () => {
    await renderComponent()
    const title = screen.getByRole('heading', { level: 1, name: 'Nuxt 4.0.3' })
    expect(title).toBeInTheDocument()
  })
})

async function renderComponent() {
  await render(HomeWelcome)
}
