import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
        console.log('state:', action.payload)
            let returnedState = action.payload ? {...state, ...action.payload} : {...state}
            return {
                ...returnedState
            }
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};