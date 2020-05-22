import { ActionTypes } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { PlaylistSecurityServices } from './services';
import { ContentSecuritySettings, SecuritySettings } from '../../Settings/Security/types';

export interface GetPlaylistSecuritySettings {
    type: ActionTypes.GET_PLAYLIST_SECURITY_SETTINGS;
    payload: ContentSecuritySettings;
}

export interface SavePlaylistSecuritySettings {
    type: ActionTypes.SAVE_PLAYLIST_SECURITY_SETTINGS;
    payload: ContentSecuritySettings;
}

export const getPlaylistSecuritySettingsAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlaylistSecuritySettings> ) => {
        await PlaylistSecurityServices.getPlaylistSecuritySettingsService(playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAYLIST_SECURITY_SETTINGS, payload: {contentId: playlistId, securitySettings: response.data.data}} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistSecuritySettingsAction = (data: SecuritySettings, playlistId: string): ThunkDispatch<Promise<void>, {}, SavePlaylistSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SavePlaylistSecuritySettings> ) => {
        await PlaylistSecurityServices.savePlaylistSecuritySettingsService(data, playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_SECURITY_SETTINGS, payload: {contentId: playlistId, securitySettings: data}} );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistSecuritySettings | SavePlaylistSecuritySettings