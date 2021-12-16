import { Client } from 'discord.js';
import { EventHandler } from './EventHandler';
import { INTERACTION_EVENTS_MAP } from './Interaction';
import { MESSAGE_EVENTS_MAP } from './Message';
import { STATUS_EVENTS_MAP } from './Status';

const EVENTS_HANDLERS: { [key: string]: EventHandler } = {
  ...INTERACTION_EVENTS_MAP,
  ...MESSAGE_EVENTS_MAP,
  ...STATUS_EVENTS_MAP
};

class EventsManager {
  register(client: Client) {
    Object.entries(EVENTS_HANDLERS).forEach(([eventName, eventHandler]) => {
      client.on(eventName, (...args: any[]) =>
        (eventHandler.exec as any)(client, ...args)
      );
    });
  }
}

export const eventsManager = new EventsManager();
