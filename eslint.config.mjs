import { createConfigForNuxt } from '@nuxt/eslint-config'
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).append(
  eslintPluginTailwindcss.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    settings: {
      tailwindcss: {
        cssConfigPath: './app/assets/css/main.css',
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-canonical-classname': 'error',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/important-modifier-suffix': 'error',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    },
  },
)
