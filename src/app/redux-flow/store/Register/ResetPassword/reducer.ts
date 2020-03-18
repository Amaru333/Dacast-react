import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultStateResetPassword, ResetPasswordInfo } from './types'

const reducer: Reducer<ResetPasswordInfo> = (state = defaultStateResetPassword, action: Action) => {
    switch(action.type) {
        case ActionTypes.RESET_PASSWORD : 
            return {
                ...action.payload
            }
        default :
            return {...state}
    }
}

export { reducer as ResetPasswordReducer};