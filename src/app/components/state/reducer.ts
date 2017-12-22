


import * as GameActions from './actions';



// const defaultState: Post = {
//     text: 'Hello. I am the default post',
//     likes: 0
//   }


const newState = (state, newData) => {
    return Object.assign({}, state, newData)
  }
  
export function gameReducer(state = {}, action: GameActions.GameActions) {
    switch (action.type) {
      case GameActions.START_GAME:
        return newState({}, action.payload.game);
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
