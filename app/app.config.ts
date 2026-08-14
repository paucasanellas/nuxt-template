const eyebrow = 'flex items-center gap-2 font-mono text-xs leading-none tracking-widest font-medium text-dimmed'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'fuchsia',
      neutral: 'slate',
    },
    pageHero: {
      slots: {
        container: 'py-20 sm:py-28 lg:py-32',
        wrapper: 'max-w-4xl',
        headline: 'mb-6',
        title: () => 'text-4xl sm:text-6xl lg:text-7xl leading-none tracking-tight font-bold font-display text-pretty text-highlighted',
        description: 'mt-6 max-w-2xl text-pretty text-lg text-muted sm:text-xl/8',
        body: 'mt-12',
        footer: 'mt-12',
      },
      variants: {
        headline: {
          true: { headline: eyebrow },
        },
        orientation: {
          vertical: {
            wrapper: 'text-left',
            headline: 'justify-start',
            links: 'justify-start',
          },
        },
      },
    },
    pageSection: {
      slots: {
        container: 'py-16 sm:py-20 lg:py-24',
        header: 'max-w-3xl',
        headline: 'mb-5',
        title: () => 'text-3xl sm:text-4xl leading-tight tracking-tight font-bold font-display text-pretty text-highlighted',
        description: 'mt-5 text-pretty text-base text-muted sm:text-lg',
        body: 'mt-12',
      },
      variants: {
        headline: {
          true: { headline: `${eyebrow} before:size-1.5 before:bg-primary before:content-[""]` },
        },
        orientation: {
          vertical: {
            headline: 'justify-start',
            title: 'text-left',
            description: 'text-left',
          },
        },
      },
    },
    pageCTA: {
      slots: {
        container: 'px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20',
        wrapper: 'max-w-3xl',
        title: () => 'text-3xl sm:text-4xl leading-tight tracking-tight font-bold font-display text-pretty text-highlighted',
        description: 'mt-5 text-pretty text-base text-muted sm:text-lg',
        footer: 'mt-10',
      },
      variants: {
        orientation: {
          vertical: {
            title: 'text-left',
            description: 'text-left',
            links: 'justify-start',
          },
        },
      },
    },
  },
})
