import { combineReducers } from "redux";
import { toastsInitialState, ToastsState, ToastReducer } from './toasts'

export interface ApplicationState {
    toasts: ToastsState;
}

export const globalDefaultState: ApplicationState = {
    toasts: toastsInitialState,
};

export const createRootReducer = () =>
    combineReducers({
        toasts: ToastReducer,
    });