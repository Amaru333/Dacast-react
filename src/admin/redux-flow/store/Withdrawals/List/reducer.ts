import { Reducer } from "redux";
import { Action } from "./actions";
import { withdrawalsListInitialState, ActionTypes, Withdrawal } from './types';


const reducer: Reducer<Withdrawal[] | false> = (state = withdrawalsListInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_WITHDRAWALS :
            return action.payload
        default :
            return state
    }
}

export { reducer as WithdrawalsListReducer}