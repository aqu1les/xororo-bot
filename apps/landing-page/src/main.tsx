/* @refresh reload */
import { render } from 'solid-js/web';
import i18next from 'i18next';

import './index.scss';

import { ToastProvider } from './app/core/toast.context';
import { setupThemeContext } from './app/core/theme.context';
import App from './app/App';
import { I18nProvider } from './app/core/i18n.context';

const { ThemeProvider } = setupThemeContext(window, document.documentElement);

render(
  () => (
    <ThemeProvider>
      <I18nProvider i18n={i18next}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </I18nProvider>
    </ThemeProvider>
  ),
  document.getElementById('root') as HTMLElement
);
