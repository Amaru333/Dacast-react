import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { liveEngagementServices } from './services';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';

export interface GetLiveEngagementSettings {
    type: ActionTypes.GET_LIVE_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SaveLiveEngagementSettings {
    type: ActionTypes.SAVE_LIVE_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SaveLiveAd {
    type: ActionTypes.SAVE_LIVE_AD;
    payload: {ads: Ad[]; contentId: string;};
}

export interface CreateLiveAd {
    type: ActionTypes.CREATE_LIVE_AD;
    payload: {ads: Ad[], adsId: string; contentId: string};
}

export interface DeleteLiveAd {
    type: ActionTypes.DELETE_LIVE_AD;
    payload:{ads: Ad[]; contentId: string;}; 
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: {data:  {presignedURL: string, liveID: string }};
}

export interface UploadLiveImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteLiveImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
}

export const getLiveEngagementSettingsAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLiveEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetLiveEngagementSettings> ) => {
        await liveEngagementServices.getLiveEngagementSettings(liveId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_LIVE_ENGAGEMENT_SETTINGS, payload: {contentId: liveId, engagementSettings: response.data.data}} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveEngagementSettingsAction = (data: ContentEngagementSettings): ThunkDispatch<Promise<void>, {}, SaveLiveEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveEngagementSettings> ) => {
        await liveEngagementServices.saveLiveEngagementSettings(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_ENGAGEMENT_SETTINGS, payload: data} );
                dispatch(showToastNotification("Changes have been saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveAdAction = (data: Ad[], adsId: string, liveId: string): ThunkDispatch<Promise<void>, {}, SaveLiveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveAd> ) => {
        await liveEngagementServices.saveLiveAd(data, adsId, liveId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_AD, payload: {ads: data, contentId: liveId}} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createLiveAdAction = (data: Ad[], adsId: string, liveId: string): ThunkDispatch<Promise<void>, {}, CreateLiveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateLiveAd> ) => {
        await liveEngagementServices.saveLiveAd(data, adsId, liveId)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_LIVE_AD, payload: {ads: data, adsId: response.data.data.adsId, contentId: liveId}} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteLiveAdAction = (data: Ad[], adsId: string, liveId: string): ThunkDispatch<Promise<void>, {}, DeleteLiveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteLiveAd> ) => {
        await liveEngagementServices.deleteLiveAd(data, adsId, liveId)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_LIVE_AD, payload: {ads: data, contentId: liveId}} );
                dispatch(showToastNotification("Ad has been deleted", 'fixed', "success"));
            }).catch((e) => {
                console.log(e)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadUrlAction = (uploadType: string, liveId: string): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await liveEngagementServices.getUploadUrl(uploadType, liveId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: {data: response.data.data, liveId: liveId} })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadLiveImageAction = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadLiveImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadLiveImage>) => {
        await liveEngagementServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: response.data })
                dispatch(showToastNotification("Brand image successfully uploaded", 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteLiveImageAction = (targetId: string): ThunkDispatch<Promise<void>, {}, DeleteLiveImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLiveImage>) => {
        await liveEngagementServices.deleteFile(targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: response.data })
                dispatch(showToastNotification("Brand image sucessfully deleted", 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetLiveEngagementSettings | SaveLiveEngagementSettings | SaveLiveAd | CreateLiveAd | DeleteLiveAd | GetUploadUrl | UploadLiveImage | DeleteLiveImage