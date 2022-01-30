export interface Interaction {
  user?: {
    id: string;
    username: string;
  };
  reply(message: string): unknown;
}
