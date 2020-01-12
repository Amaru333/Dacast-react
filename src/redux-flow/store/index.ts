import { combineReducers } from "redux";
import {  SettingsState, SettingsInitialState, SettingsReducer} from "./Settings";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './Toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
import { vodInitialState, VodState, VodReducer } from './VOD'
import { RegisterInitialState, RegisterState, RegisterReducer } from './Register'

export interface ApplicationState {
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
    vod: VodState;
    register: RegisterState;
}

export const globalDefaultState: ApplicationState = {
    settings: SettingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account:accountInitialState,
    vod: vodInitialState,
    register: RegisterInitialState
};

export const createRootReducer = () =>
    combineReducers({
        settings: SettingsReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer,
        vod: VodReducer,
        register: RegisterReducer
    },
    );