import { ContentTheme, ThemeOptions, ContentThemeState } from '../../Settings/Theming/types';
import { ActionTypes } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { applyViewModel, parseContentType } from '../../../../utils/utils';
import { ContentThemingServices } from './services';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetContentThemesInput, formatGetContentThemesOutput } from './viewModel';
import { ContentType } from '../../Common/types';

export interface GetContentTheme {
    type: ActionTypes.GET_CONTENT_THEME;
    payload: ContentTheme & {contentType: string};
}

export interface SaveContentTheme {
    type: ActionTypes.SAVE_CONTENT_THEME;
    payload: { contentId: string; data: ThemeOptions, contentType: string};
}

export const getContentThemeAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodThemes, formatGetContentThemesInput, formatGetContentThemesOutput(contentType), ActionTypes.GET_CONTENT_THEME, null, 'Couldn\'t get video themes')
        case 'live':
            return applyViewModel(dacastSdk.getChannelThemes, formatGetContentThemesInput, formatGetContentThemesOutput(contentType), ActionTypes.GET_CONTENT_THEME, null, 'Couldn\'t get channel themes')
        case 'playlist': 
            return applyViewModel(dacastSdk.getPlaylistThemes, formatGetContentThemesInput, formatGetContentThemesOutput(contentType), ActionTypes.GET_CONTENT_THEME, null, 'Couldn\'t get playlist themes')
        default:
            throw new Error('Error applying content view model')
    }
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