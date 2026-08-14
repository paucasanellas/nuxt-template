import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).append({
  files: ['**/*.vue'],
  rules: {
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
  },
})
