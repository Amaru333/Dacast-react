import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, TransactionsInfo, transactionsInitialState } from './types';

const reducer: Reducer<TransactionsInfo> = (state = transactionsInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_TRANSACTIONS : 
            return {
                ...state,
                ...action.payload
            }    
        case ActionTypes.GET_TRANSACTIONS_CSV : 
            return {
                ...state,
                csvString: action.payload
            }     
        default:
            return state;
    }
}

export { reducer as TransactionsReducer };