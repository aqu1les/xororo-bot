import i18next from 'i18next';
import { i18nConfig } from '@config/i18n';

import { createContext, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

enum Lang {
  Pt = 'pt',
  En = 'en'
}
type i18nStore = [
  {
    i18n: typeof i18next;
    loaded: boolean;
    language: Lang;
  },
  {
    changeLanguage(lang: Lang): void;
  }
];

const I18nContext = createContext({} as i18nStore);

export function I18nProvider(props: { i18n: typeof i18next; children: any }) {
  const [state, updateStore] = createStore({
    i18n: props.i18n,
    loaded: false,
    language: Lang.Pt
  });

  const store: i18nStore = [
    state,
    {
      changeLanguage(lang: Lang) {
        state.i18n.changeLanguage(lang).then(() => {
          updateStore('language', state.i18n.language as Lang);
        });
      }
    }
  ];

  onMount(() => {
    i18nConfig.then(() => updateStore('loaded', true)).catch();
  });

  return (
    <I18nContext.Provider value={store}>{props.children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
