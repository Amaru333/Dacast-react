import { ActionTypes, VodDetails, SubtitleInfo, VodItem, SearchResult } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { showToastNotification } from '../../Toasts'
import { VodGeneralServices } from './services'

export interface GetVodDetails {
    type: ActionTypes.GET_VOD_DETAILS;
    payload: {data: VodDetails};
}

export interface GetVodList {
    type: ActionTypes.GET_VOD_LIST;
    payload: {data: SearchResult};
}

export interface EditVodDetails {
    type: ActionTypes.EDIT_VOD_DETAILS;
    payload: VodDetails;
}

export interface AddVodSubtitle {
    type: ActionTypes.ADD_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface EditVodSubtitle {
    type: ActionTypes.EDIT_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface DeleteVodSubtitle {
    type: ActionTypes.DELETE_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: { id: string; data:  {presignedURL: string } };
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
}

export interface PostVod {
    type: ActionTypes.POST_VOD;
    payload: {};
}

export interface DeleteVod {
    type: ActionTypes.DELETE_VOD;
    payload: {id: string};
}


export const postVodDemo = (): PostVod => {
    return {
        type: ActionTypes.POST_VOD,
        payload: {}
    }
}

export const deleteVodAction = (vodId: string): ThunkDispatch<Promise<void>, {}, DeleteVod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVod>) => {
        await VodGeneralServices.deleteVodService(vodId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_VOD, payload: {id: vodId} })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const getVodDetailsAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodDetails>) => {
        await VodGeneralServices.getVodDetailsService(vodId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_VOD_DETAILS, payload: response.data })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    };
}

export const getVodListAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetVodList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetVodList>) => {
        await VodGeneralServices.getVodList(qs)
            .then(response => {
                dispatch({ type: ActionTypes.GET_VOD_LIST, payload: response.data })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const editVodDetailsAction = (data: VodDetails): ThunkDispatch<Promise<void>, {}, EditVodDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, EditVodDetails>) => {
        await VodGeneralServices.editVodDetailsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.EDIT_VOD_DETAILS, payload: data })
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const getUploadUrlAction = (uploadType: string, vodId: string, subtitleInfo?: SubtitleInfo): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await VodGeneralServices.getUploadUrl(uploadType, vodId, subtitleInfo)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload:{ id: vodId, data: response.data.data } })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadFileAction = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImage>) => {
        await VodGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: response.data })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteFileAction = (vodId: string, targetId: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await VodGeneralServices.deleteFile(vodId, targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: response.data })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetVodDetails | EditVodDetails | AddVodSubtitle | EditVodSubtitle | DeleteVodSubtitle | GetUploadUrl | UploadImage | DeleteImage | GetVodList | PostVod | DeleteVod