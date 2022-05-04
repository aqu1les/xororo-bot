import React, { createContext, useState, useEffect, useMemo } from 'react';

export enum Themes {
  Dark = 'dark',
  Light = 'light'
}

export const ALLOWED_THEMES: string[] = [Themes.Dark, Themes.Light];
export const ThemeContext = createContext({
  theme: Themes.Light,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (theme: Themes): void => {
    return void 0;
  }
});

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

  return {
    ThemeContext,
    ThemeProvider: ({
      initialTheme,
      children
    }: React.PropsWithChildren<{ initialTheme?: Themes }>) => {
      const [theme, setTheme] = useState(initialTheme ?? getInitialTheme());
      const value = useMemo(() => ({ theme, setTheme }), [theme]);

      const rawSetTheme = (rawTheme: Themes) => {
        rootElement.classList.remove(...ALLOWED_THEMES);
        rootElement.classList.add(rawTheme);

        globalObj.localStorage.setItem('color-theme', rawTheme);
      };

      if (initialTheme) {
        rawSetTheme(initialTheme);
      }

      useEffect(() => {
        rawSetTheme(theme);
      }, [theme]);

      return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
      );
    }
  };
};
