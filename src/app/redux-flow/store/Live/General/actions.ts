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
    payload: {data:  {presignedURL: string }};
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
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
                dispatch(showToastNotification("Channel has been deleted", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadUrlAction = (uploadType: string, liveId: string): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await LiveGeneralServices.getUploadUrl(uploadType, liveId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: response.data })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadFileAction = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImage>) => {
        await LiveGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: response.data })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteFileAction = (liveId: string, targetId: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await LiveGeneralServices.deleteFile(liveId, targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: response.data })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}



export type Action = GetLiveDetails | GetLiveList | SaveLiveDetails | GetUploadUrl | DeleteImage | UploadImage | DeleteLiveChannel
