import { combineReducers } from "redux";
import {  SettingsState, SettingsInitialState, SettingsReducer} from "./Settings";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './Toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
import { vodInitialState, VodState, VodReducer } from './VOD'
import { LiveReducer, LiveState, liveInitialState } from '../store/Live/types'
import { PaywallState, paywallInitialState, PaywallReducer } from './Paywall/types';
import { TitleReducer } from './Title/logic';
import {withRouter} from 'react-router-dom';


export interface ApplicationState {
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
    vod: VodState;
    live: LiveState;
    paywall: PaywallState;
    title: string;
}

export const globalDefaultState: ApplicationState = {
    settings: SettingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account: accountInitialState,
    vod: vodInitialState,
    live: liveInitialState,
    paywall: paywallInitialState,
    title: ""
};

export const createRootReducer = () =>
    combineReducers({
        settings: SettingsReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer,
        vod: VodReducer,
        live: LiveReducer,
        paywall: PaywallReducer,
        title: TitleReducer
    },
    );