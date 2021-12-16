import { EventHandler } from '../EventHandler';
import { Error } from './Error';
import { Ready } from './Ready';

export const STATUS_EVENTS_MAP: { [key: string]: EventHandler } = {
  ready: new Ready(),
  error: new Error()
};
