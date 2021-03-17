import { ContentTheme, ThemeOptions, ContentThemeState } from '../../Settings/Theming/types';
import { ActionTypes } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { parseContentType } from '../../../../utils/utils';
import { ContentThemingServices } from './services';

export interface GetContentTheme {
    type: ActionTypes.GET_CONTENT_THEME;
    payload: ContentTheme & {contentType: string};
}

export interface SaveContentTheme {
    type: ActionTypes.SAVE_CONTENT_THEME;
    payload: { contentId: string; data: ThemeOptions, contentType: string};
}

export const getContentThemeAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetContentTheme> ) => {
        await ContentThemingServices.getContentThemeService(contentId, parseContentType(contentType))
            .then( response => {
                let data = response.data.data ? response.data.data : response.data
                dispatch( {type: ActionTypes.GET_CONTENT_THEME, payload: { contentId: contentId, themes: data.themes, contentThemeId: data.contentThemeID, contentType: contentType }} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveContentThemeAction = (data: ThemeOptions, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentTheme> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveContentTheme> ) => {
        await ContentThemingServices.saveContentThemeService(data, contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_CONTENT_THEME, payload: { contentId: contentId, data: data, contentType: contentType } } );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action = GetContentTheme | SaveContentTheme