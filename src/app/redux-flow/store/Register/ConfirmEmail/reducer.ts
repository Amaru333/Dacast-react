import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultStateConfirmEmail, ConfirmEmailInfo } from './types'

const reducer: Reducer<ConfirmEmailInfo> = (state = defaultStateConfirmEmail, action: Action) => {
    switch(action.type) {
        case ActionTypes.SEND_CONFIRM_EMAIL : 
            return {
                ...action.payload
            }
        default :
            return {...state}
    }
}

export { reducer as ConfirmEmailReducer};