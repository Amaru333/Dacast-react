import { Reducer } from "redux";
import { Action } from "./actions";
import { accountsListInitialState, ActionTypes, Account } from './types';


const reducer: Reducer<Account[] | false> = (state = false, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNTS :
            return false
        default :
            return state
    }
}

export default reducer