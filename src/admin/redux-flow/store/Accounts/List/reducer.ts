import { Reducer } from "redux";
import { Action } from "./actions";
import { accountsListInitialState, ActionTypes, Account } from './types';


const reducer: Reducer<Account[] | false> = (state = accountsListInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNTS :
            return action.payload.data.accounts.map((account) => {
                return {
                    ...account,
                    id: account.userID,
                    userName: account.firstName + ' ' + account.lastName,
                    data: account.bandwidth
                }
            })
        default :
            return state
    }
}

export { reducer as ListReducer}