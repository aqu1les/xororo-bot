import { EventHandler } from '../EventHandler';
import { InteractionCreate } from './InteractionCreate';

export const INTERACTION_EVENTS_MAP: { [key: string]: EventHandler } = {
  interactionCreate: new InteractionCreate()
};
