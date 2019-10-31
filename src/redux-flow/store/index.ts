import { combineReducers } from "redux";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'
import { accountInitialState, AccountState, AccountReducer } from './Account'
export interface ApplicationState {
    toasts: ToastsState;
    account: any;
}

export const globalDefaultState: ApplicationState = {
    toasts: toastsInitialState,
    account: accountInitialState,
};

export const createRootReducer = () =>
    combineReducers({
        toasts: ToastReducer,
        account: AccountReducer
    });