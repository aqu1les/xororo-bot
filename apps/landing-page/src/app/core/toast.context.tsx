/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  Fragment
} from 'react';
import { useTimeoutFn } from 'react-use';
import { Transition } from '@headlessui/react';

export interface ToastOptions {
  message: string;
  duration?: number;
}

export const ToastContext = createContext({
  open: (options: ToastOptions): void => {
    return void 0;
  },
  close: (): void => {
    return void 0;
  }
});

export const ToastProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(5000);

  const [, , resetIsShowing] = useTimeoutFn(() => setIsOpen(false), duration);
  const value = useMemo(
    () => ({
      open: (options: ToastOptions) => {
        setMessage(options.message);
        setDuration(options.duration ?? 5000);

        setIsOpen(true);
        resetIsShowing();
      },
      close: () => {
        setIsOpen(false);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 translate-y-[-20px] scale-50"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95"
      >
        <output
          id="toast-default"
          className="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-200 dark:bg-secondary"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-primary rounded-lg bg-primary-lighten dark:bg-primary dark:text-primary-dark">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="ml-3 text-sm font-normal">{message}</div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="ml-auto h-8 w-8 accent"
            data-dismiss-target="#toast-default"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </output>
      </Transition>

      {children}
    </ToastContext.Provider>
  );
};
