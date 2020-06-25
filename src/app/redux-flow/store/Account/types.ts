import {ProfilePageInfos, ProfileReducer } from './Profile'
import { combineReducers, Reducer } from 'redux';
import { CompanyPageInfos, CompanyReducer } from './Company';
import { BillingPageInfos, BillingReducer } from './Billing';
import { Invoice, InvoicesReducer } from './Invoices';
import { PendingOrdersList } from './PendingOrders/types';
import { PendingOrdersReducer } from './PendingOrders/reducer';
import { Plans } from './Upgrade/types';
import { UpgradeReducer } from "./Upgrade/reducer"

export interface  AccountState {
    profile: false | ProfilePageInfos;
    company: false | CompanyPageInfos;
    billing: false | BillingPageInfos;
    invoices: false | Invoice[];
    pendingOrders: false | PendingOrdersList;
    upgrade: false | Plans;
}

export const accountInitialState: AccountState = {
    profile: false,
    company: false,
    billing: false,
    invoices: false,
    pendingOrders: false,
    upgrade: false
}

export const AccountReducer: Reducer<AccountState> = combineReducers({
    profile: ProfileReducer,
    company: CompanyReducer,
    billing: BillingReducer,
    invoices: InvoicesReducer,
    pendingOrders: PendingOrdersReducer,
    upgrade: UpgradeReducer
})
