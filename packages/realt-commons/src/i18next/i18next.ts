import { initReactI18next } from "react-i18next";
import i18next, { Resource, i18n } from "i18next";
import { resources as localResources } from "./locales";
import { mergeResources } from "i18next-resources-for-ts";
import LngDetector from "i18next-browser-languagedetector";

export const DEFAULT_NS = "common";
export const FALLBACK_LNG = "en";

const initLanguage = (resources?: Resource): i18n => {
  const mergedRessources = mergeResources(localResources);
  i18next
    .use(LngDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ["en", "es", "fr"],
      detection: {
        order: ["navigator", "cookie", "localStorage"],
      },
      resources: mergedRessources,
      defaultNS: DEFAULT_NS,
      fallbackLng: FALLBACK_LNG,
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false,
      },
    });

  if (resources) {
    // language
    for (const [lng, lngResources] of Object.entries(resources)) {
      // namespace
      for (const [namespace, nsResources] of Object.entries(lngResources)) {
        // console.log(`${namespace}: ${resources}`);
        i18next.addResourceBundle(lng, namespace, nsResources);
      }
    }
  }

  return i18next;
};

export { initLanguage };
