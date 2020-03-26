import { Reducer } from "redux";
import { Action } from "./actions";
import { accountLogsDefaultState, ActionTypes, Logs } from './types';


const reducer: Reducer<Logs[] | false> = (state = accountLogsDefaultState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNT_LOGS :
            return action.payload
        default :
            return state
    }
}

export { reducer as AccountLogsReducer}