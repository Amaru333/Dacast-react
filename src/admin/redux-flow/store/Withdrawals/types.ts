import { Withdrawal } from './List/types';
import { combineReducers, Reducer } from 'redux';
import {WithdrawalsListReducer} from './List/reducer';
import { WithdrawalInfo } from './EditStatus/types';
import { EditWithdrawalReducer } from './EditStatus/reducer';


export interface WithdrawalsState {
    list: Withdrawal[] | false;
    status: WithdrawalInfo | false;
}

export const withdrawalsListInitialState: WithdrawalsState = {
    list: false,
    status: false
}

export const WithdrawalsReducer: Reducer<WithdrawalsState> = combineReducers({
    list: WithdrawalsListReducer,
    status: EditWithdrawalReducer
})

