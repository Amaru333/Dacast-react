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
    payload: {ads: Ad[]; contentId: string;}
}

export interface CreatePlaylistAd {
    type: ActionTypes.CREATE_PLAYLIST_AD;
    payload: {ads: Ad[], adsId: string; contentId: string};
}

export interface DeletePlaylistAd {
    type: ActionTypes.DELETE_PLAYLIST_AD;
    payload: {ads: Ad[]; contentId: string;}
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
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_ENGAGEMENT_SETTINGS, payload: data} );
                dispatch(showToastNotification("Engagement settings saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistAdAction = (data: Ad[], adsId: string, playlistId: string): ThunkDispatch<Promise<void>, {}, SavePlaylistAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SavePlaylistAd> ) => {
        await playlistEngagementServices.savePlaylistAd(data, adsId, playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_AD, payload: {ads: data, contentId: playlistId}} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createPlaylistAdAction = (data: Ad[], adsId: string, playlistId: string): ThunkDispatch<Promise<void>, {}, CreatePlaylistAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreatePlaylistAd> ) => {
        await playlistEngagementServices.savePlaylistAd(data, adsId, playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_PLAYLIST_AD, payload: {ads: data, adsId: response.data.data.adsId, contentId: playlistId}} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deletePlaylistAdAction = (data: Ad[], adsId: string, playlistId: string): ThunkDispatch<Promise<void>, {}, DeletePlaylistAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeletePlaylistAd> ) => {
        await playlistEngagementServices.savePlaylistAd(data, adsId, playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_PLAYLIST_AD, payload: {ads: data, contentId: playlistId}} );
                dispatch(showToastNotification("Ad has been deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistEngagementSettings | SavePlaylistEngagementSettings | SavePlaylistAd | CreatePlaylistAd | DeletePlaylistAd