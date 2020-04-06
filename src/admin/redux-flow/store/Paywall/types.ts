import { combineReducers, Reducer } from 'redux';
import { AccountBalanceInfo } from './Balances/types';
import { BalancesReducer } from './Balances/reducer';
import { Chargeback } from './Chargebacks/types';
import { ChargebackReducer } from './Chargebacks/reducer';


export interface PaywallState {
    balances: AccountBalanceInfo | false;
    chargeback: Chargeback | false;
}

export const paywallInitialState: PaywallState = {
    balances: false,
    chargeback: false
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    balances: BalancesReducer,
    chargeback: ChargebackReducer
})

