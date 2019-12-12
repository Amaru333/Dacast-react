import { combineReducers } from "redux";
import {  uploaderInitialState, UploaderState, UploaderReducer } from "./Uploader";
import {  SettingsState, SettingsInitialState, SettingsReducer} from "./Settings";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
import { vodInitialState, VodState, VodReducer } from './VOD'

export interface ApplicationState {
    uploader: UploaderState;
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
    vod: VodState;
}

export const globalDefaultState: ApplicationState = {
    uploader:uploaderInitialState,
    settings: SettingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account:accountInitialState,
    vod: vodInitialState
};

export const createRootReducer = () =>
    combineReducers({
        uploader:UploaderReducer,
        settings: SettingsReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer,
        vod: VodReducer
    },
    );