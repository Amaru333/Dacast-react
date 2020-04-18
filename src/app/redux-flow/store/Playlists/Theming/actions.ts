import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { PlaylistTheme, ActionTypes } from "../Theming/types"
import { PlaylistThemingServices } from './services';
import { ContentTheme } from '../../Settings/Theming/types';

export interface GetPlaylistTheme {
    type: ActionTypes.GET_PLAYLIST_THEME;
    payload: ContentTheme;
}

export interface SavePlaylistTheme {
    type: ActionTypes.SAVE_PLAYLIST_THEME;
    payload: ContentTheme;
}

export const getPlaylistThemeAction = (): ThunkDispatch<Promise<void>, {}, GetPlaylistTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlaylistTheme> ) => {
        await PlaylistThemingServices.getPlaylistThemeService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAYLIST_THEME, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const savePlaylistThemeAction = (data: PlaylistTheme): ThunkDispatch<Promise<void>, {}, SavePlaylistTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SavePlaylistTheme> ) => {
        await PlaylistThemingServices.savePlaylistThemeService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PLAYLIST_THEME, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistTheme | SavePlaylistTheme