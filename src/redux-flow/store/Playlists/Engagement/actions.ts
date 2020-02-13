import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PlaylistEngagementSettings } from './types';
import { playlistEngagementServices } from './services';
import { InteractionsInfos, Ad } from '../../Settings/Interactions';

export interface GetPlaylistEngagementSettings {
    type: ActionTypes.GET_PLAYLIST_ENGAGEMENT_SETTINGS;
    payload: PlaylistEngagementSettings;
}

export interface SavePlaylistEngagementSettings {
    type: ActionTypes.SAVE_PLAYLIST_ENGAGEMENT_SETTINGS;
    payload: PlaylistEngagementSettings;
}

export interface SavePlaylistAd {
    type: ActionTypes.SAVE_PLAYLIST_AD;
    payload: Ad;
}

export interface CreatePlaylistAd {
    type: ActionTypes.CREATE_PLAYLIST_AD;
    payload: Ad;
}

export interface DeletePlaylistAd {
    type: ActionTypes.DELETE_PLAYLIST_AD;
    payload: Ad; 
}

export const getPlaylistEngagementSettingsAction = (): ThunkDispatch<Promise<void>, {}, GetPlaylistEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlaylistEngagementSettings> ) => {
        await playlistEngagementServices.getPlaylistEngagementSettings()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAYLIST_ENGAGEMENT_SETTINGS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistEngagementSettingsAction = (data: PlaylistEngagementSettings): ThunkDispatch<Promise<void>, {}, SavePlaylistEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SavePlaylistEngagementSettings> ) => {
        await playlistEngagementServices.savePlaylistEngagementSettings(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_ENGAGEMENT_SETTINGS, payload: response.data} );
                dispatch(showToastNotification("Engagement settings saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, SavePlaylistAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SavePlaylistAd> ) => {
        await playlistEngagementServices.savePlaylistAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_AD, payload: response.data} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createPlaylistAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, CreatePlaylistAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreatePlaylistAd> ) => {
        await playlistEngagementServices.createPlaylistAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_PLAYLIST_AD, payload: response.data} );
                dispatch(showToastNotification("Ad created", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deletePlaylistAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, DeletePlaylistAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeletePlaylistAd> ) => {
        await playlistEngagementServices.deletePlaylistAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_PLAYLIST_AD, payload: response.data} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistEngagementSettings | SavePlaylistEngagementSettings | SavePlaylistAd | CreatePlaylistAd | DeletePlaylistAd