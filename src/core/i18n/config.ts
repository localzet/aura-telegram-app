export const defaultLocale = 'en'

export const timeZone = 'Europe/Amsterdam'

export const locales = [defaultLocale, 'ru'] as const

export const localesMap = [
    { label: 'English', emoji: '🇺🇸', value: 'en' },
    { label: 'Русский', emoji: '🇷🇺', value: 'ru' }
]
