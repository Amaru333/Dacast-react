import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from "../Theming/types"
import { PlaylistThemingServices } from './services';
import { ContentTheme, ThemeOptions } from '../../Settings/Theming/types';

export interface GetPlaylistTheme {
    type: ActionTypes.GET_PLAYLIST_THEME;
    payload: ContentTheme;
}

export interface SavePlaylistTheme {
    type: ActionTypes.SAVE_PLAYLIST_THEME;
    payload: { id: string; data: ThemeOptions};
}

export const getPlaylistThemeAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlaylistTheme> ) => {
        await PlaylistThemingServices.getPlaylistThemeService(playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAYLIST_THEME, payload: { contentId: playlistId, themes: response.data.data.themes, contentThemeId: response.data.data.contentThemeID }} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistThemeAction = (data: ThemeOptions, playlistId: string): ThunkDispatch<Promise<void>, {}, SavePlaylistTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SavePlaylistTheme> ) => {
        await PlaylistThemingServices.savePlaylistThemeService(data, playlistId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_THEME, payload: { id: playlistId, data: data }} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistTheme | SavePlaylistTheme