import { Action } from '@ngrx/store'

export function simpleReduser(state : string  = "current state", action: Action){
    console.log(action.type, state)
    switch(action.type){
        case 'SPANISH':
            return state = 'Spanish Babay'

        case 'FRENCH':
            return state = 'Franch Babay'

        default:
            return state;
    }
}