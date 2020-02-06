import {ProfilePageInfos, ProfileReducer } from './Profile'
import { combineReducers, Reducer } from 'redux';
import { CompanyPageInfos, CompanyReducer } from './Company';
import { BillingPageInfos, BillingReducer } from './Billing';
import { Invoice, InvoicesReducer } from './Invoices';

export interface  AccountState {
    profile: false | ProfilePageInfos;
    company: false | CompanyPageInfos;
    billing: false | BillingPageInfos;
    invoices: false | Invoice[];
}

export const accountInitialState: AccountState = {
    profile: false,
    company: false,
    billing: false,
    invoices: false
}

export const AccountReducer: Reducer<AccountState> = combineReducers({
    profile: ProfileReducer,
    company: CompanyReducer,
    billing: BillingReducer,
    invoices: InvoicesReducer
})
