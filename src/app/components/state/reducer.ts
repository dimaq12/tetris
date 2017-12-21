


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
        let foo = newState({}, action.payload.game)
        console.log(foo);
        return foo;
      case GameActions.DESTROY_GAME:
        return state;
      case GameActions.UPDATE_COUNTER:
        return state;
      case GameActions.UPDATE_LEVEL:
        return state;
      default:
        return state;
    }
  }
