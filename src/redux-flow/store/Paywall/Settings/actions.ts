import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PaywallSettingsInfos } from './types';
import { PaywallSettingsServices } from './services';

export interface GetPaywallSettingsInfos {
    type: ActionTypes.GET_PAYWALL_SETTINGS_INFOS;
    payload: PaywallSettingsInfos;
}

export interface SavePaywallSettingsInfos {
    type: ActionTypes.SAVE_PAYWALL_SETTINGS_INFOS;
    payload: PaywallSettingsInfos;
}

export const getPaywallSettingsInfosAction = (): ThunkDispatch<Promise<void>, {}, GetPaywallSettingsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPaywallSettingsInfos>) => {
        await PaywallSettingsServices.getPaywallSettingsInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYWALL_SETTINGS_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const savePaywallSettingsInfosAction = (data: PaywallSettingsInfos): ThunkDispatch<Promise<void>, {}, SavePaywallSettingsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePaywallSettingsInfos>) => {
        await PaywallSettingsServices.savePaywallSettingsInfos(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PAYWALL_SETTINGS_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}


export type Action = GetPaywallSettingsInfos | SavePaywallSettingsInfos