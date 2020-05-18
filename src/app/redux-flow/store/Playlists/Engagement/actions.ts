import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { playlistEngagementServices } from './services';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';

export interface GetPlaylistEngagementSettings {
    type: ActionTypes.GET_PLAYLIST_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SavePlaylistEngagementSettings {
    type: ActionTypes.SAVE_PLAYLIST_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
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

export const getPlaylistEngagementSettingsAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlaylistEngagementSettings> ) => {
        await playlistEngagementServices.getPlaylistEngagementSettings(playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAYLIST_ENGAGEMENT_SETTINGS, payload: {contentId: playlistId, engagementSettings: response.data.data}} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistEngagementSettingsAction = (data: ContentEngagementSettings): ThunkDispatch<Promise<void>, {}, SavePlaylistEngagementSettings> => {
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
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
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
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
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
                dispatch(showToastNotification("Ad has been deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistEngagementSettings | SavePlaylistEngagementSettings | SavePlaylistAd | CreatePlaylistAd | DeletePlaylistAd