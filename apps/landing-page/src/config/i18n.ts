import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const i18nConfig = i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init(
    {
      fallbackLng: 'pt',
      preload: ['pt'],
      supportedLngs: ['pt', 'en'],
      ns: 'app',
      defaultNS: 'app',
      fallbackNS: false,
      debug: import.meta.env.DEV,
      detection: {
        order: ['path', 'navigator', 'htmlTag'],
        lookupFromPathIndex: 0
      },
      backend: {
        loadPath: `/i18n/{{lng}}/{{ns}}.json`,
        queryStringParams: { v: __BUILD_HASH__ }
      }
    },
    (err) => {
      if (err) return console.error(err);
    }
  );
