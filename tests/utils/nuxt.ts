import { mockComponent, mockNuxtImport, registerEndpoint, renderSuspended } from '@nuxt/test-utils/runtime'
import { userEvent } from '@testing-library/user-event'
import { fireEvent, screen, within } from '@testing-library/vue'

export const render: typeof renderSuspended = (component, options = {}) => {
  return renderSuspended(component, {
    ...options,
  })
}

export { fireEvent, mockComponent, mockNuxtImport, registerEndpoint, screen, userEvent, within }
