import {ProfilePageInfos, ProfileReducer } from './Profile'
import { combineReducers, Reducer } from 'redux';
import { CompanyPageInfos, CompanyReducer } from './Company';
import { BillingPageInfos, BillingReducer } from './Billing';
import { Invoice, InvoicesReducer } from './Invoices';
import { PendingOrder } from './PendingOrders/types';
import { PendingOrdersReducer } from './PendingOrders/reducer';
import { Plans } from './Plans/types';
import { PlansReducer } from "./Plans/reducer"

export interface  AccountState {
    profile: false | ProfilePageInfos;
    company: false | CompanyPageInfos;
    billing: false | BillingPageInfos;
    invoices: false | Invoice[];
    pendingOrders: false | PendingOrder[];
    plans: false | Plans;
}

export const accountInitialState: AccountState = {
    profile: false,
    company: false,
    billing: false,
    invoices: false,
    pendingOrders: false,
    plans: false
}

export const AccountReducer: Reducer<AccountState> = combineReducers({
    profile: ProfileReducer,
    company: CompanyReducer,
    billing: BillingReducer,
    invoices: InvoicesReducer,
    pendingOrders: PendingOrdersReducer,
    plans: PlansReducer
})
