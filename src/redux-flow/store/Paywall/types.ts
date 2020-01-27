import { combineReducers, Reducer } from 'redux';
import { PayoutReducer } from './Payout/reducer';
import { PayoutInfos } from './Payout/types';

export const paywallInitialState: PaywallState = {
    payout: false
}

export interface PaywallState {
    payout: false | PayoutInfos;
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    payout: PayoutReducer
})