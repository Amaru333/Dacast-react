import { ContentSecuritySettings, SecuritySettings } from '../../Settings/Security/types';
import { ActionTypes } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { ContentSecurityServices } from './services';
import { applyViewModel, parseContentType } from '../../../../utils/utils';
import { showToastNotification } from '../../Toasts/actions';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { ContentType } from '../../Common/types';
import { formatGetContentSecuritySettingsInput, formatGetContentSecuritySettingsOutput, formatPutContentSecuritySettingsInput, formatPutContentSecuritySettingsOutput, formatPutLockContentSecuritySettings } from './viewModel';

export interface GetContentSecuritySettings {
    type: ActionTypes.GET_CONTENT_SECURITY_SETTINGS;
    payload: ContentSecuritySettings & {contentType: string}
}

export interface SaveContentSecuritySettings {
    type: ActionTypes.SAVE_CONTENT_SECURITY_SETTINGS;
    payload: ContentSecuritySettings & {contentType: string}
}

export interface LockContent {
    type: ActionTypes.LOCK_CONTENT;
    payload: null
}

export const getContentSecuritySettingsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodSecuritySettings, formatGetContentSecuritySettingsInput, formatGetContentSecuritySettingsOutput(contentType), ActionTypes.GET_CONTENT_SECURITY_SETTINGS, null, 'Couldn\'t get video security settings')
        case 'live':
            return applyViewModel(dacastSdk.getChannelSecuritySettings, formatGetContentSecuritySettingsInput, formatGetContentSecuritySettingsOutput(contentType), ActionTypes.GET_CONTENT_SECURITY_SETTINGS, null, 'Couldn\'t get channel security settings')
        case 'playlist': 
            return applyViewModel(dacastSdk.getPlaylistSecuritySettings, formatGetContentSecuritySettingsInput, formatGetContentSecuritySettingsOutput(contentType), ActionTypes.GET_CONTENT_SECURITY_SETTINGS, null, 'Couldn\'t get playlist security settings')
        default:
            throw new Error('Error applying content view model')
    }
}

export const saveContentSecuritySettingsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodSecuritySettings, formatPutContentSecuritySettingsInput, formatPutContentSecuritySettingsOutput(contentType), ActionTypes.SAVE_CONTENT_SECURITY_SETTINGS, 'Changes saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putChannelSecuritySettings, formatPutContentSecuritySettingsInput, formatPutContentSecuritySettingsOutput(contentType), ActionTypes.SAVE_CONTENT_SECURITY_SETTINGS, 'Changes saved', 'Couldn\'t save changes')
        case 'playlist': 
            return applyViewModel(dacastSdk.putPlaylistSecuritySettings, formatPutContentSecuritySettingsInput, formatPutContentSecuritySettingsOutput(contentType), ActionTypes.SAVE_CONTENT_SECURITY_SETTINGS, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying content view model')
    }
}

export const lockContentAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putLockVodSecuritySettings, formatPutLockContentSecuritySettings, undefined, ActionTypes.LOCK_CONTENT, 'Changes saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putLockChannelSecuritySettings, formatPutLockContentSecuritySettings, undefined, ActionTypes.LOCK_CONTENT, 'Changes saved', 'Couldn\'t save changes')
        case 'playlist': 
            return applyViewModel(dacastSdk.putLockPlaylistSecuritySettings, formatPutLockContentSecuritySettings, undefined, ActionTypes.LOCK_CONTENT, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying content view model')
    }
}

export type Action = GetContentSecuritySettings | SaveContentSecuritySettings | LockContent