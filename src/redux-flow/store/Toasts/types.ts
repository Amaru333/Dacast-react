import { ToastType } from '../../../components/Toast/ToastTypes';

export enum ActionTypes {
    SHOW_TOAST = "@@toast/SHOW_TOAST",
    HIDE_TOAST = "@@toast/HIDE_TOAST",
}

export const toastsInitialState: ToastsState = {
    data: [],
};

export interface ToastsState {
    readonly data: ToastType[];
}