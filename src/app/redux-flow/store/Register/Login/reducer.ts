import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'
import { userToken } from '../../../../utils/services/token/tokenService';

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
            let returnedState = action.payload ? {...state, ...action.payload.data} : {...state}
            return {
                ...returnedState
            }
        case ActionTypes.LOGIN_ERROR : 
            return {...state, error: true}
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};