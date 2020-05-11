import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TokenInfos, defaultStateLogin } from './types'
import { resetUserInfo } from '../../../../utils/token';

const reducer: Reducer<TokenInfos> = (state = defaultStateLogin, action: Action) => {
    switch(action.type) {
        case ActionTypes.LOGIN : 
            console.log(action);
            let returnedState = action.payload ? {...state, ...action.payload.data} : {...state}
            return {
                ...returnedState
            }
        case ActionTypes.LOGOUT :
            resetUserInfo()
            return action.payload
        default :
            return {...state}
    }
}

export { reducer as LoginReducer};