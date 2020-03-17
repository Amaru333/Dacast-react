import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
            console.log(action.payload)
            return {
                ... state, ...action.payload
            }
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};