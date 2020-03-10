import { combineReducers, Reducer } from 'redux';
import { PayoutReducer } from './Payout/reducer';
import { PayoutInfos } from './Payout/types';
import { TransactionsInfos } from './Transactions/types';
import { TransactionsReducer } from './Transactions/reducer';
import { PaywallSettingsInfos } from './Settings/types';
import { PaywallSettingsReducer } from './Settings/reducer';
import { PresetsPageInfos, PresetsReducer } from './Presets';
import { PaywallThemingData, PaywallThemingReducer } from './Theming';
import { GroupsPageInfos, GroupsReducer } from './Groups';

export const paywallInitialState: PaywallState = {
    payout: false,
    transactions: false,
    paywallSettings: false, 
    presets: false,
    theming: false,
    groups: false
}

export interface PaywallState {
    payout: false | PayoutInfos;
    transactions: false | TransactionsInfos;
    paywallSettings: false | PaywallSettingsInfos;
    presets: false | PresetsPageInfos;
    theming: false | PaywallThemingData;
    groups: false | GroupsPageInfos;
}

export const PaywallReducer: Reducer<PaywallState> = combineReducers({
    payout: PayoutReducer,
    transactions: TransactionsReducer,
    paywallSettings: PaywallSettingsReducer,
    presets: PresetsReducer,
    theming: PaywallThemingReducer,
    groups: GroupsReducer
})