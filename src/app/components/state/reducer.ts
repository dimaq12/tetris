


import * as GameActions from './actions';
import { Game } from '../state/game.model';



const game =  {
  id: '1',
  started: false,
  field: this.field,
  score: 0,
  level: 1,
  pause: false
}


const newState = (state, newData) => {
    return Object.assign({}, game, newData)
  }
  
export function gameReducer(state: Game = game, action: GameActions.GameActions) {
    switch (action.type) {
      case GameActions.START_GAME:
        return newState({}, action.payload.started);
      case GameActions.DESTROY_GAME:
        return state;
      case GameActions.UPDATE_COUNTER:
        return newState(state, {score: state.score + action.payload.score});
      case GameActions.UPDATE_LEVEL:
        return state;
      default:
        return state;
    }
  }
