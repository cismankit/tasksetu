import { en, type TranslationKeys, type TranslationSchema } from './en';
import { hi } from './hi';

export type SupportedLocale = 'en' | 'hi';

const translations: Record<SupportedLocale, TranslationSchema> = {
  en,
  hi,
};

export function t(locale: SupportedLocale): TranslationSchema {
  return translations[locale] ?? en;
}

export function getSupportedLocales(): SupportedLocale[] {
  return Object.keys(translations) as SupportedLocale[];
}

export { en, hi };
export type { TranslationKeys, TranslationSchema };
