import { combineReducers, Reducer } from 'redux';
import { PayoutReducer } from './Payout/reducer';
import { PayoutInfos } from './Payout/types';
import { TransactionsInfos } from './Transactions/types';
import { TransactionsReducer } from './Transactions/reducer';
import { PaywallSettingsInfos } from './Settings/types';
import { PaywallSettingsReducer } from './Settings/reducer';

export const paywallInitialState: PaywallState = {
    payout: false,
    transactions: false,
    paywallSettings: false,   
}

export interface PaywallState {
    payout: false | PayoutInfos;
    transactions: false | TransactionsInfos;
    paywallSettings: false | PaywallSettingsInfos;
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    payout: PayoutReducer,
    transactions: TransactionsReducer,
    paywallSettings: PaywallSettingsReducer
})