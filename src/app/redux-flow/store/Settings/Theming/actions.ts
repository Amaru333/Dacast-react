import { ActionTypes, ThemeOptions  } from "./types";
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatDeleteThemeInput, formatGetThemesOutput, formatPostThemeInput, formatPostThemeOutput, formatPutThemeInput } from './viewModel';

export interface GetThemesList {
    type: ActionTypes.GET_SETTING_THEMING_LIST;
    payload: {themes: ThemeOptions[]};
}

export interface SaveTheme {
    type: ActionTypes.SAVE_SETTING_THEME;
    payload: ThemeOptions;
}

export interface CreateTheme {
    type: ActionTypes.CREATE_SETTING_THEME;
    payload: ThemeOptions;
}

export interface DeleteTheme {
    type: ActionTypes.DELETE_SETTING_THEME;
    payload: ThemeOptions;
}

export type Action = GetThemesList | SaveTheme | CreateTheme | DeleteTheme

export const getThemingListAction = applyViewModel(dacastSdk.getThemes, undefined, formatGetThemesOutput, ActionTypes.GET_SETTING_THEMING_LIST, null, 'Couldn\'t get themes list')
export const createThemeAction = applyViewModel(dacastSdk.postTheme, formatPostThemeInput, formatPostThemeOutput, ActionTypes.CREATE_SETTING_THEME, 'Theme has been created', 'Couldn\'t create theme')
export const saveThemeAction = applyViewModel(dacastSdk.putTheme, formatPutThemeInput, undefined, ActionTypes.SAVE_SETTING_THEME, 'Theme has been updated', 'Couldn\'t update theme')
export const deleteThemeAction = applyViewModel(dacastSdk.deleteTheme, formatDeleteThemeInput, undefined, ActionTypes.DELETE_SETTING_THEME, 'Theme has been deleted', 'Couldn\'t delete theme')

