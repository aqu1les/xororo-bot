import { XamaCommand } from './xama';

// ADAPTED COMMANDS
import { OiCommandAdapter } from './Adapters/oi.adapter';
import { ComandosCommandAdapter } from './Adapters/comandos.adapter';
import { CuCommandAdapter } from './Adapters/cu.adapter';
import { CusCommandAdapter } from './Adapters/cus.adapter';
import { EloCommandAdapter } from './Adapters/elo.adapter';
import { LanseCommandAdapter } from './Adapters/lanse.adapter';
import { PingCommandAdapter } from './Adapters/ping.adapter';
import { PvtCommandAdapter } from './Adapters/pvt.adapter';

// UNIQUE COMMANDS
import { JoinCommand } from './join';

// MUSIC PLAY
import { LeaveCommand } from './leave';
import { PauseCommand } from './pause';
import { PlayCommand } from './play';
import { QueueCommand } from './queue';
import { ResumeCommand } from './resume';
import { SkipCommand } from './skip';
import { StopCommand } from './stop';
import { DiscordCommandHandler } from '../Command';

export const COMMANDS_HANDLERS: {
  new (): DiscordCommandHandler;
}[] = [
  OiCommandAdapter,
  ComandosCommandAdapter,
  CuCommandAdapter,
  CusCommandAdapter,
  EloCommandAdapter,
  LanseCommandAdapter,
  PingCommandAdapter,
  PvtCommandAdapter,
  XamaCommand,
  // UNIQUE ↓
  JoinCommand,
  // MUSIC PLAY
  LeaveCommand,
  PauseCommand,
  PlayCommand,
  QueueCommand,
  ResumeCommand,
  SkipCommand,
  StopCommand
];
