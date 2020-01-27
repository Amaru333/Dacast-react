import { combineReducers, Reducer } from 'redux';
import { PayoutReducer } from './Payout/reducer';
import { PayoutInfos } from './Payout/types';
import { PaywallSettingsInfos } from './Settings/types';
import { PaywallSettingsReducer } from './Settings/reducer';

export const paywallInitialState: PaywallState = {
    payout: false,
    paywallSettings: false,
}

export interface PaywallState {
    payout: false | PayoutInfos;
    paywallSettings: false | PaywallSettingsInfos;
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    payout: PayoutReducer,
    paywallSettings: PaywallSettingsReducer
})