import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'

import LangSwitcher from './LangSwitcher.vue'

import type { Locale } from '@/types'

const locales: Locale[] = [
  {
    code: 'en',
    iso: 'en-en',
    file: 'en-EN.json',
    name: 'English'
  },
  {
    code: 'es',
    iso: 'es-es',
    file: 'es-ES.json',
    name: 'Castellano'
  }
]

const defaultLocale = 'en'

describe('Component: LangSwitcher', () => {
  it('user should see a button with i18n icon', async () => {
    renderSuspended(LangSwitcher, {
      props: {
        locales,
        locale: defaultLocale
      }
    })

    const [button] = await screen.findAllByRole('button')
    expect(button.querySelector('.i-heroicons-language')).toBeInTheDocument()
  })

  it('user should see language options and selected language', async () => {
    renderSuspended(LangSwitcher, {
      props: {
        locales,
        locale: defaultLocale
      }
    })

    const [button] = await screen.findAllByRole('button')
    fireEvent.click(button)

    await screen.findAllByRole('listbox')
    const [selectedLocale, unselectedLocale] = await screen.findAllByRole('option')

    expect(selectedLocale).toHaveAttribute('aria-selected', 'true')
    expect(unselectedLocale).toHaveAttribute('aria-selected', 'false')
  })

  it('should emits a new locale when user clicks an option', async () => {
    const { emitted } = await renderSuspended(LangSwitcher, {
      props: {
        locales,
        locale: defaultLocale
      }
    })

    const [button] = await screen.findAllByRole('button')
    await fireEvent.click(button)

    await screen.findAllByRole('listbox')
    const [, unselectedLocale] = await screen.findAllByRole('option')

    await fireEvent.click(unselectedLocale)

    const [[newLocale]] = emitted('update') as Locale[][]
    expect(newLocale).toHaveProperty('code', 'es')
  })
})
