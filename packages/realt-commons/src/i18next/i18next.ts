import { initReactI18next } from 'react-i18next';
import i18next, { Resource, i18n } from 'i18next';
import { resources as localResources } from './locales';

export const DEFAULT_NS = 'common';
export const FALLBACK_LNG = 'en';

i18next.use(initReactI18next);

const initLanguage = (resources?: Resource): i18n => {
  i18next.init({
    resources: {
      ...localResources,
      ...resources
    },
    defaultNS: DEFAULT_NS,
    fallbackLng: FALLBACK_LNG,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });
  return i18next;
}

export { initLanguage };
