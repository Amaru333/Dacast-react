import { combineReducers } from "redux";

import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
import { settingsInitialState, SettingsState } from './Settings/types';
import { SettingsReducer } from './Settings/reducer';

export interface ApplicationState {
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
}

export const globalDefaultState: ApplicationState = {
    settings: settingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account:accountInitialState
};

export const createRootReducer = () =>
    combineReducers({
        settings:SettingsReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer
    },);