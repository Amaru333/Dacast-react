import { combineReducers, Reducer } from 'redux';
import { AccountBalanceInfo } from './Balances/types';
import { BalancesReducer } from './Balances/reducer';


export interface PaywallState {
    balances: AccountBalanceInfo | false;
}

export const paywallInitialState: PaywallState = {
    balances: false
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    balances: BalancesReducer
})

