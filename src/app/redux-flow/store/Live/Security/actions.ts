import { ActionTypes } from "../Security/types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { LiveSecurityServices } from '../Security/services';
import { ContentSecuritySettings, SecuritySettings } from '../../Settings/Security';

export interface GetLiveSecuritySettings {
    type: ActionTypes.GET_LIVE_SECURITY_SETTINGS;
    payload: ContentSecuritySettings;
}

export interface SaveLiveSecuritySettings {
    type: ActionTypes.SAVE_LIVE_SECURITY_SETTINGS;
    payload: ContentSecuritySettings;
}

export const getLiveSecuritySettingsAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLiveSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetLiveSecuritySettings> ) => {
        await LiveSecurityServices.getLiveSecuritySettingsService(liveId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_LIVE_SECURITY_SETTINGS, payload: { contentId: liveId, securitySettings: response.data.data } } );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveSecuritySettingsAction = (data: SecuritySettings, liveId: string): ThunkDispatch<Promise<void>, {}, SaveLiveSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveSecuritySettings> ) => {
        await LiveSecurityServices.saveLiveSecuritySettingsService(data, liveId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_SECURITY_SETTINGS, payload: { contentId: liveId, securitySettings: response.data.data } } );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetLiveSecuritySettings | SaveLiveSecuritySettings