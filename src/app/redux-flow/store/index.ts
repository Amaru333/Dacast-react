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
import { FoldersState, foldersInitialState } from './Folders/types';
import { FoldersReducer } from './Folders/reducer';
import { AnalyticsState, analyticsInitialState, AnalyticsReducer } from './Analytics';


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
    folders: FoldersState;
    title: string;
    analytics: AnalyticsState;
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
    folders: foldersInitialState,
    title: "",
    analytics: analyticsInitialState
};

export const appReducer = 
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
        paywall: PaywallReducer,
        folders: FoldersReducer,
        analytics: AnalyticsReducer
    })


export const createRootReducer = (state: any, action: any) => {
    console.log(action);
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action)
}
    