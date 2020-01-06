import { ActionTypes, VodSecuritySettings } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../toasts';
import { VodSecurityServices } from './services';

export interface GetVodSecuritySettings {
    type: ActionTypes.GET_VOD_SECURITY_SETTINGS;
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

export type Action = GetVodSecuritySettings