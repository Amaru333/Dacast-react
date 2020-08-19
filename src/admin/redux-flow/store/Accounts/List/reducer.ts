import { Reducer } from "redux";
import { Action } from "./actions";
import { accountsListInitialState, ActionTypes, Account } from './types';


const reducer: Reducer<{users: Account[]; total: number} | false> = (state = accountsListInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNTS :
            return action.payload
        default :
            return state
    }
}

export { reducer as ListReducer}