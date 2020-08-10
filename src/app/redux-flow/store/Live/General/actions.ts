import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts/actions';
import { LiveGeneralServices } from './services';
import { ActionTypes, LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload, LiveItem, SearchResult } from './types';


export interface GetLiveDetails {
    type: ActionTypes.GET_LIVE_DETAILS;
    payload: {data: LiveDetails};
}

export interface GetLiveList {
    type: ActionTypes.GET_LIVE_LIST;
    payload: {data: SearchResult};
}

export interface SaveLiveDetails {
    type: ActionTypes.SAVE_LIVE_DETAILS;
    payload: LiveDetails;
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: {id: string; data:  {presignedURL: string }};
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {liveId: string};
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {liveId: string, id: string, uploadType: string};
}

export interface DeleteLiveChannel {
    type: ActionTypes.DELETE_LIVE_CHANNEL;
    payload: string;
}

export const getLiveDetailsAction = (liveId: string): ThunkDispatch<Promise<void>, {}, GetLiveDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLiveDetails>) => {
        await LiveGeneralServices.getLiveDetailsService(liveId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_LIVE_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getLiveListAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetLiveList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetLiveList>) => {
        await LiveGeneralServices.getLiveList(qs)
            .then(response => {
                dispatch({ type: ActionTypes.GET_LIVE_LIST, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveDetailsAction = (data: LiveDetails): ThunkDispatch<Promise<void>, {}, SaveLiveDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SaveLiveDetails>) => {
        await LiveGeneralServices.saveLiveDetailsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.SAVE_LIVE_DETAILS, payload: data });
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteLiveChannelAction = (data: string): ThunkDispatch<Promise<void>, {}, DeleteLiveChannel> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteLiveChannel>) => {
        await LiveGeneralServices.deleteLiveChannelService(data)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_LIVE_CHANNEL, payload: data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadUrlAction = (uploadType: string, liveId: string, extension: string): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await LiveGeneralServices.getUploadUrl(uploadType, liveId, extension)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: { id: liveId, data: response.data.data} })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadFileAction = (data: File, uploadUrl: string, liveId: string, uploadType: string): ThunkDispatch<Promise<void>, {}, UploadImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImage>) => {
        await LiveGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: {liveId: liveId} })
                dispatch(showToastNotification(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteFileAction = (liveId: string, targetId: string, uploadType: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await LiveGeneralServices.deleteFile(liveId, targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: {liveId: liveId, id: targetId, uploadType: uploadType} })
                dispatch(showToastNotification(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}



export type Action = GetLiveDetails | GetLiveList | SaveLiveDetails | GetUploadUrl | DeleteImage | UploadImage | DeleteLiveChannel
