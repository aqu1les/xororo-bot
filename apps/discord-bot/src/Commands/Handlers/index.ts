import { CommandsListCommand } from './comandos';
import { CuCommand } from './cu';
import { CusCommand } from './cus';
import { EloCommand } from './elo';
import { OiCommand } from './oi';
import { XamaCommand } from './xama';
import { JoinCommand } from './join';
import { LanseCommand } from './lanse';
import { PingCommand } from './ping';
import { PvtCommand } from './pvt';

// MUSIC PLAY
import { LeaveCommand } from './leave';
import { PauseCommand } from './pause';
import { PlayCommand } from './play';
import { QueueCommand } from './queue';
import { ResumeCommand } from './resume';
import { SkipCommand } from './skip';
import { StopCommand } from './stop';

export const COMMANDS_HANDLERS = [
  OiCommand,
  CommandsListCommand,
  CuCommand,
  CusCommand,
  EloCommand,
  JoinCommand,
  LanseCommand,
  PingCommand,
  PvtCommand,
  XamaCommand,
  // MUSIC PLAY
  LeaveCommand,
  PauseCommand,
  PlayCommand,
  QueueCommand,
  ResumeCommand,
  SkipCommand,
  StopCommand
];
