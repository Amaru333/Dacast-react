import { ToastType } from '../../../components/Toast/ToastTypes';

export enum ActionTypes {
    SHOW_TOAST = "@@toast/SHOW_TOAST",
    HIDE_TOAST = "@@toast/HIDE_TOAST",
    HIDE_ALL_TOASTS = "@@toast/HIDE_ALL_TOASTS"
}

export const toastsInitialState: ToastsState = {
    data: [],
};

export interface ToastsState {
    readonly data: ToastType[];
}