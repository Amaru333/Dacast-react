import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
            let returnedState = action.payload ? {...state, ...action.payload.data, waiting: false} : {...state, waiting: true}
            return {
                ...returnedState
            }
        case ActionTypes.LOGOUT :
            localStorage.removeItem('userToken')
            return action.payload
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};