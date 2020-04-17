import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultStateResetPassword, ForgotPasswordInfo } from './types'

const reducer: Reducer<ForgotPasswordInfo> = (state = defaultStateResetPassword, action: Action) => {
    switch(action.type) {
        case ActionTypes.FORGOT_PASSWORD : 
            return {
                ...action.payload.data
            }
        default :
            return {...state}
    }
}

export { reducer as ResetPasswordReducer};