import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
            return {
                ... state, ...action.payload
            }
        case ActionTypes.LOGOUT :
            localStorage.removeItem('adminToken')
            return action.payload
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};