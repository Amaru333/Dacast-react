import { ContentSecuritySettings, SecuritySettings } from '../../Settings/Security/types';
import { ActionTypes } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { ContentSecurityServices } from './services';
import { parseContentType } from '../../../../utils/utils';
import { showToastNotification } from '../../Toasts/actions';

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

export const getContentSecuritySettingsAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetContentSecuritySettings> ) => {
        await ContentSecurityServices.getContentSecuritySettingsService(contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.GET_CONTENT_SECURITY_SETTINGS, payload: { contentId: contentId, securitySettings: response.data.data, contentType: contentType } } );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveContentSecuritySettingsAction = (data: SecuritySettings, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentSecuritySettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveContentSecuritySettings> ) => {
        await ContentSecurityServices.saveContentSecuritySettingsService(data, contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_CONTENT_SECURITY_SETTINGS, payload:  { contentId: contentId, securitySettings: data, contentType: contentType } } );
                dispatch(showToastNotification(`Changes have been saved`, 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const lockContentAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, LockContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, LockContent> ) => {
        await ContentSecurityServices.lockContentService(contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.LOCK_CONTENT, payload: null } );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action = GetContentSecuritySettings | SaveContentSecuritySettings | LockContent