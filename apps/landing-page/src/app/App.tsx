import './App.module.scss';

import { useRegisterSW } from 'virtual:pwa-register/solid';
import { Component, onCleanup } from 'solid-js';

import { useToast } from './core/toast.context';
import { translate } from '@core/translate.directive';

const App: Component = () => {
  const { openToast, closeToast } = useToast();

  onCleanup(() => {
    closeToast();
  });

  useRegisterSW({
    onOfflineReady() {
      openToast({ message: 'App ta pronto para ser utilizado offline!' });
    },
    onNeedRefresh() {
      openToast({ message: 'Reinicie a página para atualizar o app' });
    },
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
    }
  });

  return <div class="App">{translate('Teste')}</div>;
};

export default App;
