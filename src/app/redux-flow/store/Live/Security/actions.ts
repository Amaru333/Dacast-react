import { ActionTypes, LiveSecuritySettings, SecuritySettings } from "../Security/types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { LiveSecurityServices } from '../Security/services';

export interface GetLiveSecuritySettings {
    type: ActionTypes.GET_LIVE_SECURITY_SETTINGS;
    payload: LiveSecuritySettings;
}

export interface SaveLiveSecuritySettings {
    type: ActionTypes.SAVE_LIVE_SECURITY_SETTINGS;
    payload: LiveSecuritySettings;
}

export const getLiveSecuritySettingsAction = (): ThunkDispatch<Promise<void>, {}, GetLiveSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetLiveSecuritySettings> ) => {
        await LiveSecurityServices.getLiveSecuritySettingsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_LIVE_SECURITY_SETTINGS, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveSecuritySettingsAction = (data: SecuritySettings): ThunkDispatch<Promise<void>, {}, SaveLiveSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveSecuritySettings> ) => {
        await LiveSecurityServices.saveLiveSecuritySettingsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_SECURITY_SETTINGS, payload: response.data} );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetLiveSecuritySettings | SaveLiveSecuritySettings