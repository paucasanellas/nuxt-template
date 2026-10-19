# Nuxt Template

A reusable starting point for Nuxt projects, with an empty application shell, a neutral theme, system fonts, and English as the default language.

## Stack

Nuxt 4, Vue 3, TypeScript, Nuxt UI 4, Tailwind CSS 4, Pinia, Nuxt i18n, Lucide icons and Zod.

## Setup

Requirements: Node.js 24+ and pnpm 11.22.0. The managed runtime targets Node.js 24.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The example environment sets `PORT=8000`. Open [localhost:8000](http://localhost:8000). Use `pnpm dev:host` to expose the server on the local network.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm dev:host` | Start development server on the network |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Apply ESLint fixes |
| `pnpm typecheck` | Check TypeScript and Vue types |
| `pnpm prepare` | Install Husky hooks in a Git repository |
