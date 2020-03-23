import { Withdrawal } from './List/types';
import { combineReducers, Reducer } from 'redux';
import {WithdrawalsListReducer} from './List/reducer';


export interface WithdrawalsState {
    list: Withdrawal[] | false;
}

export const withdrawalsListInitialState: WithdrawalsState = {
    list: false,
}

export const WithdrawalsReducer: Reducer<WithdrawalsState> = combineReducers({
    list: WithdrawalsListReducer,
})

