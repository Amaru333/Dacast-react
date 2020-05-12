import { ThunkDispatch } from 'redux-thunk';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { ApplicationState } from '../..';
import { LiveThemingServices } from './services';
import { ContentTheme, ThemeOptions } from '../../Settings/Theming';

export interface GetLiveTheme {
    type: ActionTypes.GET_LIVE_THEME;
    payload: ContentTheme;
}

export interface SaveLiveTheme {
    type: ActionTypes.SAVE_LIVE_THEME;
    payload: ThemeOptions;
}

export const getLiveThemeAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLiveTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetLiveTheme> ) => {
        await LiveThemingServices.getLiveThemeService(liveId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_LIVE_THEME, payload: {themes: response.data.data.themes, id: response.data.data.contentThemeID}} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveThemeAction = (data: ThemeOptions, liveId: string): ThunkDispatch<Promise<void>, {}, SaveLiveTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveTheme> ) => {
        await LiveThemingServices.saveLiveThemeService(data, liveId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_THEME, payload: data} );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetLiveTheme | SaveLiveTheme