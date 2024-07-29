import i18n, { BackendModule, FallbackLng, FallbackLngObjList } from "i18next";
import { initReactI18next } from "react-i18next";
import { findNearestMatchedLanguage } from "./utils/i18n";

export const locales = [
  "ar",
  "de",
  "en",
  "en-GB",
  "es",
  "fr",
  "hi",
  "hr",
  "hu",
  "it",
  "ja",
  "ko",
  "mr",
  "nl",
  "pl",
  "pt-BR",
  "ru",
  "sl",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-Hans",
  "zh-Hant",
] as const;

const fallbacks = {
  "zh-HK": ["zh-Hant", "zh-Hans"],
  "zh-TW": ["zh-Hant", "zh-Hans"],
  zh: ["zh-Hans", "zh-Hant"],
} as FallbackLngObjList;

const LazyImportPlugin: BackendModule = {
  type: "backend",
  init: function () {},
  read: function (language, _, callback) {
    const matchedLanguage = findNearestMatchedLanguage(language);
    import(`./locales/${matchedLanguage}.json`)
      .then((translation: any) => {
        callback(null, translation);
      })
      .catch(() => {
        // Fallback to default language (zh-Hans).
      });
  },
};

i18n
  .use(LazyImportPlugin)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["navigator"],
    },
    fallbackLng: {
      ...fallbacks,
      ...{ default: ["zh-Hans"] },
    } as FallbackLng,
  });

export default i18n;
export type TLocale = (typeof locales)[number];
