import { ContentTheme, ThemeOptions } from '../../Settings/Theming/types';
import { ActionTypes } from './types';
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetContentThemesInput, formatGetContentThemesOutput, formatPostContentCustomThemeInput, formatPostContentCustomThemeOutput, formatPutContentThemeInput, formatPutContentThemeOutput } from './viewModel';
import { ContentType } from '../../Common/types';

export interface GetContentTheme {
    type: ActionTypes.GET_CONTENT_THEME;
    payload: ContentTheme & {contentType: ContentType};
}
export interface CreateContentCustomTheme {
    type: ActionTypes.CREATE_CONTENT_CUSTOM_THEME;
    payload: { contentId: string; theme: ThemeOptions, contentType: ContentType};
}

export interface SaveContentTheme {
    type: ActionTypes.SAVE_CONTENT_THEME;
    payload: { contentId: string; theme: ThemeOptions, contentType: ContentType};
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

export const createContentCustomThemeAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.postVodCustomTheme, formatPostContentCustomThemeInput, formatPostContentCustomThemeOutput(contentType), ActionTypes.CREATE_CONTENT_CUSTOM_THEME, 'Changes saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.postChannelCustomTheme, formatPostContentCustomThemeInput, formatPostContentCustomThemeOutput(contentType), ActionTypes.CREATE_CONTENT_CUSTOM_THEME, 'Changes saved', 'Couldn\'t save changes')
        case 'playlist': 
            return applyViewModel(dacastSdk.postPlaylistCustomTheme, formatPostContentCustomThemeInput, formatPostContentCustomThemeOutput(contentType), ActionTypes.CREATE_CONTENT_CUSTOM_THEME, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying content view model')
    }
}

export const saveContentThemeAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodCustomTheme, formatPutContentThemeInput, formatPutContentThemeOutput(contentType), ActionTypes.SAVE_CONTENT_THEME, 'Changes saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putChannelCustomTheme, formatPutContentThemeInput, formatPutContentThemeOutput(contentType), ActionTypes.SAVE_CONTENT_THEME, 'Changes saved', 'Couldn\'t save changes')
        case 'playlist': 
            return applyViewModel(dacastSdk.putPlaylistCustomTheme, formatPutContentThemeInput, formatPutContentThemeOutput(contentType), ActionTypes.SAVE_CONTENT_THEME, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying content view model')
    }
}

export type Action = GetContentTheme | SaveContentTheme | CreateContentCustomTheme