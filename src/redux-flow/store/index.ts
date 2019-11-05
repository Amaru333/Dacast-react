import { combineReducers } from "redux";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'

export interface ApplicationState {
	dashboard: DashboardState;
    toasts: ToastsState;
    account: any;
}

export const globalDefaultState: ApplicationState = {
	dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account:accountInitialState
};

export const createRootReducer = () =>
    combineReducers({
		dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer
    });