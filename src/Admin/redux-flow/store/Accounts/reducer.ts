import { Reducer } from "redux";
import { Action } from "./actions";
import { accountsInitialState, ActionTypes, AccountsState } from '.';


const reducer: Reducer<AccountsState> = (state = accountsInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNTS :
            return {
                ...state, accounts: action.payload
            }
        default :
            return state
    }
}

export {reducer as AccountsReducer }