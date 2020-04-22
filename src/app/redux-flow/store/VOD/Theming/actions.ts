import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from "../Theming/types"
import { VodThemingServices } from './services';
import { ContentTheme } from '../../Settings/Theming/types';

export interface GetVodTheme {
    type: ActionTypes.GET_VOD_THEME;
    payload: ContentTheme;
}

export interface SaveVodTheme {
    type: ActionTypes.SAVE_VOD_THEME;
    payload: ContentTheme;
}

export const getVodThemeAction = (): ThunkDispatch<Promise<void>, {}, GetVodTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodTheme> ) => {
        await VodThemingServices.getVodThemeService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_THEME, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodThemeAction = (data: ContentTheme): ThunkDispatch<Promise<void>, {}, SaveVodTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodTheme> ) => {
        await VodThemingServices.saveVodThemeService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_THEME, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodTheme | SaveVodTheme