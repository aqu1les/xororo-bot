import './App.scss';
import { useContext, useEffect } from 'react';

import { useRegisterSW } from 'virtual:pwa-register/react';
import { ToastContext } from './core/toast.context';

export function App() {
  const { open: openToast, close: closeToast } = useContext(ToastContext);

  useEffect(() => {
    return () => {
      closeToast();
    };
  }, []);

  useRegisterSW({
    onOfflineReady() {
      openToast({ message: 'App ta pronto para ser utilizado offline!' });
    },
    onNeedRefresh() {
      // TODO: perguntar se deve atualizar a página
    },
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
    }
  });

  return <div className="App">Teste</div>;
}
