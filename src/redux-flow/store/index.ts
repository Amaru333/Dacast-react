import { combineReducers } from "redux";
import {  deliveryAndEmbedInitialState, DeliveryAndEmbedState, DeliveryAndEmbedReducer } from "./DeliveryAndEmbed";
import {  dashboardInitialState, DashboardState, DashboardReducer } from "./Dashboard";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'

export interface ApplicationState {
	deliveryAndEmbed:DeliveryAndEmbedState;
    dashboard: DashboardState;
    toasts: ToastsState;
    account: AccountState;
}

export const globalDefaultState: ApplicationState = {
	deliveryAndEmbed:deliveryAndEmbedInitialState,
    dashboard: dashboardInitialState,
    toasts: toastsInitialState,
    account:accountInitialState
};

export const createRootReducer = () =>
    combineReducers({
		deliveryAndEmbed:DeliveryAndEmbedReducer,
        dashboard: DashboardReducer,
        toasts: ToastReducer,
        account: AccountReducer
    },);