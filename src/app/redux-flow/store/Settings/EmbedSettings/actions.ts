import { ActionTypes, EmbedSettingsOptionType } from "./types";
import { formatGetEmbedSettingsOuput, formatPutEmbedSettingsInput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';

export interface GetEmbedSettingsOptions {
    type: ActionTypes.GET_EMBED_SETTINGS_OPTIONS;
    payload: EmbedSettingsOptionType;
}

export interface SaveEmbedSettingsOptions {
    type: ActionTypes.SAVE_EMBED_SETTINGS_OPTIONS;
    payload: EmbedSettingsOptionType;
}

export type Action = GetEmbedSettingsOptions | SaveEmbedSettingsOptions;


export const getEmbedSettingsOptionsAction = applyViewModel(dacastSdk.getEmbedSettings, undefined, formatGetEmbedSettingsOuput, ActionTypes.GET_EMBED_SETTINGS_OPTIONS, null, 'Couldn\'t get embed settings')
export const saveEmbedSettingsOptionsAction = applyViewModel(dacastSdk.putEmbedSettings, formatPutEmbedSettingsInput, undefined, ActionTypes.SAVE_EMBED_SETTINGS_OPTIONS, 'Changes have been saved', 'Couldn\'t saved changes')