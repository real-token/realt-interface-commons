import { initReactI18next } from 'react-i18next';
import i18next, { Resource, i18n } from 'i18next';
import { resources as localResources } from './locales';
import { mergeRessources } from '../utils/i18next';

export const DEFAULT_NS = 'common';
export const FALLBACK_LNG = 'en';

const initLanguage = (resources?: Resource): i18n => {
  const mergedRessources = mergeRessources(localResources,resources);
  i18next
  .use(initReactI18next)
  .init({
    resources: mergedRessources,
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
