import { createI18n } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'no']

const i18n = createI18n({
  locale: 'no',
  fallbackLocale: 'en',
  messages: {
    en: await import('./locales/en.json'),
    no: await import('./locales/no.json'),
  },
})

export default i18n
