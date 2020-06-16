import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from "../Theming/types"
import { VodThemingServices } from './services';
import { ContentTheme, ThemeOptions } from '../../Settings/Theming/types';

export interface GetVodTheme {
    type: ActionTypes.GET_VOD_THEME;
    payload: ContentTheme;
}

export interface SaveVodTheme {
    type: ActionTypes.SAVE_VOD_THEME;
    payload: { id: string; data: ThemeOptions};
}

export const getVodThemeAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodTheme> ) => {
        await VodThemingServices.getVodThemeService(vodId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_THEME, payload: { contentId: vodId, themes: response.data.data.themes, contentThemeId: response.data.data.contentThemeID }} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodThemeAction = (data: ThemeOptions, vodId: string): ThunkDispatch<Promise<void>, {}, SaveVodTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodTheme> ) => {
        await VodThemingServices.saveVodThemeService(data, vodId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_THEME, payload: { id: vodId, data: data } } );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodTheme | SaveVodTheme