import { Reducer } from "redux";
import { Action } from "./actions";
import { balancesInitialState, ActionTypes, AccountBalanceInfo } from './types';


const reducer: Reducer<AccountBalanceInfo | false> = (state = balancesInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_BALANCES :
            return action.payload
        default :
            return state
    }
}

export { reducer as BalancesReducer}