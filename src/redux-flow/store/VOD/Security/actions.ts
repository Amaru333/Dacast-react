import { ActionTypes, VodSecuritySettings, SecuritySettings } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../toasts';
import { VodSecurityServices } from './services';

export interface GetVodSecuritySettings {
    type: ActionTypes.GET_VOD_SECURITY_SETTINGS;
    payload: VodSecuritySettings;
}

export interface SaveVodSecuritySettings {
    type: ActionTypes.SAVE_VOD_SECURITY_SETTINGS;
    payload: VodSecuritySettings;
}

export const getVodSecuritySettingsAction = (): ThunkDispatch<Promise<void>, {}, GetVodSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodSecuritySettings> ) => {
        await VodSecurityServices.getVodSecuritySettingsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_SECURITY_SETTINGS, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodSecuritySettingsAction = (data: SecuritySettings): ThunkDispatch<Promise<void>, {}, SaveVodSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodSecuritySettings> ) => {
        await VodSecurityServices.saveVodSecuritySettingsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_SECURITY_SETTINGS, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodSecuritySettings | SaveVodSecuritySettings