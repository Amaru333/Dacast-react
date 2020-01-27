import { combineReducers, Reducer } from 'redux';
import { PayoutReducer } from './Payout/reducer';
import { PayoutInfos } from './Payout/types';
import { TransactionsInfos } from './Transactions/types';
import { TransactionsReducer } from './Transactions/reducer';

export const paywallInitialState: PaywallState = {
    payout: false,
    transactions: false
}

export interface PaywallState {
    payout: false | PayoutInfos;
    transactions: false | TransactionsInfos;
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    payout: PayoutReducer,
    transactions: TransactionsReducer
})