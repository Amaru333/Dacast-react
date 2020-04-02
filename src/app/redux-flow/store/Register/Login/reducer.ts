import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                waiting: true
            }
        case ActionTypes.LOGIN : 
            return {
                ... state, ...action.payload, waiting: false
            }
        case ActionTypes.LOGOUT :
            localStorage.removeItem('userToken')
            return action.payload
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};