import {ProfilePageInfos, ProfileReducer } from './Profile'
import { combineReducers, Reducer } from 'redux';
import { CompanyPageInfos, CompanyReducer } from './Company';


export const AccountInitialState: AccountState = {
    profile: false,
    company: false,
};


export interface  AccountState {
    profile: false | ProfilePageInfos;
    company: false | CompanyPageInfos;
}

export const accountInitialState: AccountState = {
    profile: false,
    company: false
}

export const AccountReducer: Reducer<AccountState> = combineReducers({
    profile: ProfileReducer,
    company: CompanyReducer
})
