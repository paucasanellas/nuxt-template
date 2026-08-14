import { Page, PageSection } from './page'

export const home = Page.extend({
  stack: PageSection,
  content: PageSection,
  backend: PageSection,
  i18n: PageSection,
  start: PageSection,
  cta: PageSection,
})
