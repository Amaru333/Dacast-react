import { combineReducers } from "redux";
import {  SettingsState, SettingsInitialState, SettingsReducer} from "./Settings";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './Toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
import { RegisterInitialState, RegisterState, RegisterReducer } from './Register'
import { PaywallState, paywallInitialState, PaywallReducer } from './Paywall/types';
import { TitleReducer } from './Title/logic';
import { FoldersState, foldersInitialState } from './Folders/types';
import { FoldersReducer } from './Folders/reducer';
import { AnalyticsState, analyticsInitialState } from './Analytics';
import { AnalyticsReducer } from './Analytics/reducer';
import { ContentState, contentInitialState, ContentReducer } from './Content/types';


export interface ApplicationState {
    settings: SettingsState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
    register: RegisterState;
    paywall: PaywallState;
    folders: FoldersState;
    title: string;
    analytics: AnalyticsState;
    content: ContentState   
}

export const globalDefaultState: ApplicationState = {
    settings: SettingsInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    register: RegisterInitialState,
    account: accountInitialState,
    paywall: paywallInitialState,
    folders: foldersInitialState,
    title: "",
    analytics: analyticsInitialState,
    content: contentInitialState
};

export const appReducer = 
    combineReducers({
        settings: SettingsReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer,
        register: RegisterReducer,
        title: TitleReducer,
        paywall: PaywallReducer,
        folders: FoldersReducer,
        analytics: AnalyticsReducer,
        content: ContentReducer
    })


export const createRootReducer = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        state = globalDefaultState;
    }
    return appReducer(state, action)
}
    