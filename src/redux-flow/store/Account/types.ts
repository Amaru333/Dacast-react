import {ProfilePageInfos, ProfileReducer } from './Profile'
import { combineReducers, Reducer } from 'redux';
import { CompanyPageInfos, CompanyReducer } from './Company';
import { BillingPageInfos, BillingReducer } from './Billing';


export const AccountInitialState: AccountState = {
    profile: false,
    company: false,
    billing: false
};


export interface  AccountState {
    profile: false | ProfilePageInfos;
    company: false | CompanyPageInfos;
    billing: false | BillingPageInfos;
}

export const accountInitialState: AccountState = {
    profile: false,
    company: false,
    billing: false
}

export const AccountReducer: Reducer<AccountState> = combineReducers({
    profile: ProfileReducer,
    company: CompanyReducer,
    billing: BillingReducer
})
