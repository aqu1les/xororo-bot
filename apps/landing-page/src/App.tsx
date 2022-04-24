import { useState } from 'react';
import './App.scss';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useRegisterSW } from 'virtual:pwa-register/react';

function App() {
  const [show, setShow] = useState(false);

  useRegisterSW({
    onOfflineReady() {
      setShow(true);
    },
    onNeedRefresh() {
      console.log('needs refresh');
    },
    onRegistered(r) {
      setShow(true);

      r &&
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
    }
  });

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide>
          <Toast.Header>
            <strong className="me-auto">Xororó BOT:</strong>
          </Toast.Header>

          <Toast.Body>App pronto para ser usado offline!</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="App"></div>
    </>
  );
}

export default App;
