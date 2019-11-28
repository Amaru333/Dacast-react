import { combineReducers } from "redux";
import {  SettingsState, SettingsInitialState, SettingsReducer} from "./Settings";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'

export interface ApplicationState {
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
}

export const globalDefaultState: ApplicationState = {
    settings: SettingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account:accountInitialState
};

export const createRootReducer = () =>
    combineReducers({
        settings: SettingsReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer
    },);