import { ThunkDispatch } from 'redux-thunk';
import { showToastNotification } from '../../Toasts';
import { LiveTheme, ActionTypes } from './types';
import { ApplicationState } from '../..';
import { LiveThemingServices } from './services';

export interface GetLiveTheme {
    type: ActionTypes.GET_LIVE_THEME;
    payload: LiveTheme;
}

export interface SaveLiveTheme {
    type: ActionTypes.SAVE_LIVE_THEME;
    payload: LiveTheme;
}

export const getLiveThemeAction = (): ThunkDispatch<Promise<void>, {}, GetLiveTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetLiveTheme> ) => {
        await LiveThemingServices.getLiveThemeService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_LIVE_THEME, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveThemeAction = (data: LiveTheme): ThunkDispatch<Promise<void>, {}, SaveLiveTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveTheme> ) => {
        await LiveThemingServices.saveLiveThemeService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_THEME, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetLiveTheme | SaveLiveTheme