import { combineReducers } from "redux";
import { toastsInitialState, ToastsState, ToastReducer, ToastAction } from './toasts'
import { accountInitialState, AccountState, AccountReducer, AccountAction } from './Account'
export interface ApplicationState {
    toasts: ToastsState;
    account: AccountState;
}

export const globalDefaultState: ApplicationState = {
    toasts: toastsInitialState,
    account: accountInitialState,
};

export const createRootReducer = () =>
    combineReducers({
        toasts: ToastReducer,
        account: AccountReducer
    },);