import { Action } from '@ngrx/store';
import { Game } from './game.model';

export const START_GAME = 'START_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const RESTORE_GAME = 'RESTORE_GAME';
export const DESTROY_GAME = 'DESTROY_GAME';
export const UPDATE_COUNTER = 'UPDATE_COUNTER';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';

export class StartGame implements Action {
  readonly type = START_GAME;

  constructor(public payload: { started: boolean }) { }
}

export class PauseGame implements Action {
  readonly type = PAUSE_GAME;

  constructor(public payload: { pause: boolean }) { }
}

export class RestoreGame implements Action {
  readonly type = RESTORE_GAME;

  constructor(public payload: { pause: boolean }) { }
}

export class DestroyGame implements Action {
  readonly type = DESTROY_GAME;
  constructor(public payload: { id: string; newValue: string }) { }
}

export class UpdateCounter implements Action {
  readonly type = UPDATE_COUNTER;

  constructor(public payload: { score: 100 }) { }
}

export class UpdateLevel implements Action {
  readonly type = UPDATE_LEVEL;

  constructor(public payload: { id: string; done: boolean }) { }
}

export type GameActions = StartGame | PauseGame | RestoreGame | UpdateCounter | UpdateLevel;