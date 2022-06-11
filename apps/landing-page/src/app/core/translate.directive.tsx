import { createMemo } from 'solid-js';
import { useI18n } from './i18n.context';

export function translate(text: string) {
  const [{ i18n, loaded }] = useI18n();

  return createMemo(() => (loaded ? i18n.t(text) : text));
}
