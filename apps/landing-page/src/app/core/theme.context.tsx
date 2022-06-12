/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

export enum Themes {
  Dark = 'dark',
  Light = 'light'
}

export const ALLOWED_THEMES: string[] = [Themes.Dark, Themes.Light];
const ThemeContext = createContext([
  { theme: Themes.Light },
  { setTheme(theme: Themes) {} }
] as [{ theme: Themes }, { setTheme(theme: Themes): void }]);

export const setupThemeContext = (
  globalObj: {
    localStorage: Storage;
    matchMedia(query: string): MediaQueryList;
  },
  rootElement: HTMLElement
) => {
  const getInitialTheme = (): Themes => {
    if (globalObj.localStorage) {
      const storedPrefs = globalObj.localStorage.getItem('color-theme');

      if (
        typeof storedPrefs === 'string' &&
        ALLOWED_THEMES.includes(storedPrefs)
      ) {
        return storedPrefs as Themes;
      }

      const userMedia = globalObj.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return Themes.Dark;
      }
    }

    return Themes.Light;
  };

  function rawSetTheme(rawTheme: Themes) {
    rootElement.classList.remove(...ALLOWED_THEMES);
    rootElement.classList.add(rawTheme);

    globalObj.localStorage.setItem('color-theme', rawTheme);
  }

  return {
    ThemeContext,
    ThemeProvider: (props: any) => {
      const [state, setState] = createStore({
        theme: getInitialTheme()
      });
      const store = [
        state,
        {
          setTheme(theme: Themes) {
            setState('theme', theme);
            rawSetTheme(theme);
          }
        }
      ] as [{ theme: Themes }, { setTheme(theme: Themes): void }];

      onMount(() => {
        rawSetTheme(state.theme);
      });

      return (
        <ThemeContext.Provider value={store}>
          {props.children}
        </ThemeContext.Provider>
      );
    }
  };
};

export function useTheme() {
  return useContext(ThemeContext);
}
