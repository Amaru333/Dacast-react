import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PaywallSettingsInfos } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPaywallSettingsOutput, formatPutPaywallSettingsInput } from './viewModel';

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
        await dacastSdk.getPaywallSettings()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYWALL_SETTINGS_INFOS, payload: formatGetPaywallSettingsOutput(response)});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const savePaywallSettingsInfosAction = (data: PaywallSettingsInfos): ThunkDispatch<Promise<void>, {}, SavePaywallSettingsInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePaywallSettingsInfos>) => {
        await dacastSdk.putPaywallSettings(formatPutPaywallSettingsInput(data))
            .then(() => {
                dispatch({type: ActionTypes.SAVE_PAYWALL_SETTINGS_INFOS, payload: data});
                dispatch(showToastNotification("Changes have been saved", 'fixed', 'success'));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}


export type Action = GetPaywallSettingsInfos | SavePaywallSettingsInfos