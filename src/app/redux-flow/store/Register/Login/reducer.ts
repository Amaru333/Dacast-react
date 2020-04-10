import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
            return {
                ... state, ...action.payload, waiting: !action.payload ? true : false
            }
        case ActionTypes.LOGOUT :
            localStorage.removeItem('userToken')
            return action.payload
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};