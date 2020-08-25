import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { contentEngagementServices } from './services';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { parseContentType } from '../../../../utils/utils';

export interface GetContentEngagementSettings {
    type: ActionTypes.GET_CONTENT_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings & {contentType: string};
}

export interface SaveContentEngagementSettings {
    type: ActionTypes.SAVE_CONTENT_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings & {contentType: string};
}

export interface LockSection {
    type: ActionTypes.LOCK_SECTION;
    payload: ContentEngagementSettings & {contentType: string};
}

export interface SaveContentAd {
    type: ActionTypes.SAVE_CONTENT_AD;
    payload: {ads: Ad[]; contentId: string; contentType: string;};
}

export interface CreateContentAd {
    type: ActionTypes.CREATE_CONTENT_AD;
    payload: {ads: Ad[], adsId: string; contentId: string; contentType: string;};
}

export interface DeleteContentAd {
    type: ActionTypes.DELETE_CONTENT_AD;
    payload:{ads: Ad[]; contentId: string; contentType: string;}; 
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: {presignedURL: string, contentId: string; contentType: string };
}

export interface UploadContentImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteContentImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
}

export const getContentEngagementSettingsAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetContentEngagementSettings> ) => {
        await contentEngagementServices.getContentEngagementSettings(contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.GET_CONTENT_ENGAGEMENT_SETTINGS, payload: {contentId: contentId, contentType: contentType, engagementSettings: {...response.data.data, adsId: response.data.data.adsID}}} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveContentEngagementSettingsAction = (data: ContentEngagementSettings, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveContentEngagementSettings> ) => {
        await contentEngagementServices.saveContentEngagementSettings(data, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_CONTENT_ENGAGEMENT_SETTINGS, payload: {...data, contentType: contentType}} );
                dispatch(showToastNotification("Changes have been saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const lockSectionAction = (section: string, contentId: string, contentType: string, unlock?: boolean): ThunkDispatch<Promise<void>, {}, LockSection> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, LockSection> ) => {
        await contentEngagementServices.lockSection(section, contentId,  parseContentType(contentType), unlock)
            .then( response => {
                dispatch( {type: ActionTypes.LOCK_SECTION, payload: null});
                dispatch(showToastNotification("Changes have been saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export const saveContentAdAction = (data: Ad[], contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, SaveContentAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveContentAd> ) => {
        await contentEngagementServices.saveContentAd(data, contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_CONTENT_AD, payload: {ads: data, contentId: contentId, contentType: contentType}} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createContentAdAction = (data: Ad[], contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, CreateContentAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateContentAd> ) => {
        await contentEngagementServices.saveContentAd(data, contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_CONTENT_AD, payload: {ads: data, adsId: response.data.data.adsId, contentId: contentId, contentType: contentType}} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteContentAdAction = (data: Ad[], contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContentAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteContentAd> ) => {
        await contentEngagementServices.saveContentAd(data, contentId, parseContentType(contentType))
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_CONTENT_AD, payload: {ads: data, contentId: contentId, contentType: contentType}} );
                dispatch(showToastNotification("Ad has been deleted", 'fixed', "success"));
            }).catch((e) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadUrlAction = (uploadType: string, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await contentEngagementServices.getUploadUrl(uploadType, contentId, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: {presignedURL: response.data.data.presignedURL, contentId: contentId, contentType: contentType} })
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadContentImageAction = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadContentImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadContentImage>) => {
        await contentEngagementServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: response.data })
                dispatch(showToastNotification("Brand image successfully uploaded", 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteContentImageAction = (targetId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContentImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContentImage>) => {
        await contentEngagementServices.deleteFile(targetId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: response.data })
                dispatch(showToastNotification("Brand image sucessfully deleted", 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetContentEngagementSettings | SaveContentEngagementSettings | LockSection | SaveContentAd | CreateContentAd | DeleteContentAd | GetUploadUrl | UploadContentImage | DeleteContentImage