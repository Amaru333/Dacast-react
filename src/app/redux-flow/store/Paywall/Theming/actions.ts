import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PaywallTheme } from './types';
import { PaywallThemeServices } from './services';

export interface GetPaywallThemes {
    type: ActionTypes.GET_PAYWALL_THEMES;
    payload:{data: {themes:PaywallTheme[]}};
}

export interface SavePaywallTheme {
    type: ActionTypes.SAVE_PAYWALL_THEME;
    payload: PaywallTheme;
}

export interface CreatePaywallTheme {
    type: ActionTypes.CREATE_PAYWALL_THEME;
    payload: PaywallTheme;
}

export interface DeletePaywallTheme {
    type: ActionTypes.DELETE_PAYWALL_THEME;
    payload: PaywallTheme;
}

export const getPaywallThemesAction = (): ThunkDispatch<Promise<void>, {}, GetPaywallThemes> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPaywallThemes>) => {
        await PaywallThemeServices.getPaywallThemes()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYWALL_THEMES, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const savePaywallThemeAction = (data: PaywallTheme): ThunkDispatch<Promise<void>, {}, SavePaywallTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePaywallTheme>) => {
        await PaywallThemeServices.savePaywallTheme(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PAYWALL_THEME, payload: data});
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const createPaywallThemeAction = (data: PaywallTheme): ThunkDispatch<Promise<void>, {}, CreatePaywallTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePaywallTheme>) => {
        await PaywallThemeServices.createPaywallTheme(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PAYWALL_THEME, payload: {...data, id: response.data.data}});
                dispatch(showToastNotification(`${data.name} has been created`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const deletePaywallThemeAction = (data: PaywallTheme): ThunkDispatch<Promise<void>, {}, DeletePaywallTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePaywallTheme>) => {
        await PaywallThemeServices.deletePaywallTheme(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PAYWALL_THEME, payload: data});
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export type Action = GetPaywallThemes | SavePaywallTheme | CreatePaywallTheme | DeletePaywallTheme;