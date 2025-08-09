import '@testing-library/jest-dom/vitest'

import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useNuxtApp } from 'nuxt/app'

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n)
