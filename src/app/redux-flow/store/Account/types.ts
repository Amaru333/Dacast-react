import {ProfilePageInfos, ProfileReducer } from './Profile'
import { combineReducers, Reducer } from 'redux';
import { CompanyPageInfos, CompanyReducer } from './Company';
import { BillingPageInfos, PlanReducer } from './Plan';
import { Invoice, InvoicesReducer, SearchInvoicesResult } from './Invoices';
import { PendingOrdersList } from './PendingOrders/types';
import { PendingOrdersReducer } from './PendingOrders/reducer';
import { Plans } from './Upgrade/types';
import { UpgradeReducer } from "./Upgrade/reducer"
import { MultiUserDetails } from './Users/types';
import { MultiUsersReducer } from './Users/reducer';

export interface  AccountState {
    profile: false | ProfilePageInfos;
    company: false | CompanyPageInfos;
    plan: false | BillingPageInfos;
    invoices: false | SearchInvoicesResult;
    pendingOrders: false | PendingOrdersList;
    upgrade: false | Plans;
    multiUsers: false | MultiUserDetails;
}

export const accountInitialState: AccountState = {
    profile: false,
    company: false,
    plan: false,
    invoices: false,
    pendingOrders: false,
    upgrade: false,
    multiUsers: false
}

export const AccountReducer: Reducer<AccountState> = combineReducers({
    profile: ProfileReducer,
    company: CompanyReducer,
    plan: PlanReducer,
    invoices: InvoicesReducer,
    pendingOrders: PendingOrdersReducer,
    upgrade: UpgradeReducer,
    multiUsers: MultiUsersReducer
})
