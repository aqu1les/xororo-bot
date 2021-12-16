import { EventHandler } from '../EventHandler';
import { MessageCreate } from './MessageCreate';

export const MESSAGE_EVENTS_MAP: { [key: string]: EventHandler } = {
  messageCreate: new MessageCreate()
};
