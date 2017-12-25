import * as GameActions from './actions';
import { Game } from '../state/game.model';

const game = {
  id: '1',
  started: false,
  field: this.field,
  score: 0,
  level: 1,
  pause: true
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function gameReducer(state = game, action: GameActions.GameActions) {
  switch (action.type) {
    case GameActions.START_GAME:
      return newState(state, { started: action.payload.started });
    case GameActions.PAUSE_GAME:
      return newState(state, { pause: action.payload.pause });
    case GameActions.RESTORE_GAME:
      return newState(state, { pause: action.payload.pause });
    case GameActions.UPDATE_COUNTER:
      return newState(state, { score: state.score + action.payload.score });
    case GameActions.UPDATE_LEVEL:
      return state;
    default:
      return state;
  }
}
