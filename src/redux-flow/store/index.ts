import { combineReducers } from "redux";
import {  SettingsState, SettingsInitialState, SettingsReducer} from "./Settings";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './Toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
import { vodInitialState, VodState, VodReducer } from './VOD'
import { RegisterInitialState, RegisterState, RegisterReducer } from './Register'
import { LiveReducer, LiveState, liveInitialState } from '../store/Live/types'
import { PaywallState, paywallInitialState, PaywallReducer } from './Paywall/types';
import { TitleReducer } from './Title/logic';
import { PlaylistState, playlistInitialState, PlaylistReducer } from './Playlists';


export interface ApplicationState {
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
    vod: VodState;
    register: RegisterState;
    live: LiveState;
    playlist: PlaylistState;
    paywall: PaywallState;
    title: string;
}

export const globalDefaultState: ApplicationState = {
    settings: SettingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    register: RegisterInitialState,
    account: accountInitialState,
    vod: vodInitialState,
    playlist: playlistInitialState,
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
        register: RegisterReducer,
        live: LiveReducer,
        title: TitleReducer,
        playlist: PlaylistReducer,
        paywall: PaywallReducer
    },
    );