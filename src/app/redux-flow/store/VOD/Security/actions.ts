import { ActionTypes } from "./types";

import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { VodSecurityServices } from './services';
import { ContentSecuritySettings, SecuritySettings } from '../../Settings/Security/types';

export interface GetVodSecuritySettings {
    type: ActionTypes.GET_VOD_SECURITY_SETTINGS;
    payload: ContentSecuritySettings;
}

export interface SaveVodSecuritySettings {
    type: ActionTypes.SAVE_VOD_SECURITY_SETTINGS;
    payload: ContentSecuritySettings;
}

export const getVodSecuritySettingsAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodSecuritySettings> ) => {
        await VodSecurityServices.getVodSecuritySettingsService(vodId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_SECURITY_SETTINGS, payload: { contentId: vodId, securitySettings: response.data.data } } );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodSecuritySettingsAction = (data: SecuritySettings, vodId: string): ThunkDispatch<Promise<void>, {}, SaveVodSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodSecuritySettings> ) => {
        await VodSecurityServices.saveVodSecuritySettingsService(data, vodId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_SECURITY_SETTINGS, payload:  { contentId: vodId, securitySettings: response.data.data } } );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodSecuritySettings | SaveVodSecuritySettings