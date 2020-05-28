import { ActionTypes, VodDetails, SubtitleInfo, VodItem, SearchResult, AssetType } from "./types"
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
    payload: {vodId: string; data: SubtitleInfo};
}

export interface EditVodSubtitle {
    type: ActionTypes.EDIT_VOD_SUBTITLE;
    payload: SubtitleInfo;
}

export interface DeleteVodSubtitle {
    type: ActionTypes.DELETE_VOD_SUBTITLE;
    payload: {targetID: string; vodId: string;};
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: { vodId: string; url: string, data: SubtitleInfo };
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface UploadImageFromVideo {
    type: ActionTypes.UPLOAD_IMAGE_FROM_VIDEO;
    payload: AssetType;
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {id: string};
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
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: {vodId: vodId, data: uploadType === 'subtitle' ? {...subtitleInfo, targetID: response.data.data.fileID} : null, url: response.data.data.presignedURL} })

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
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadImageFromVideoAction = (vodId: string, time: number, imageType: string): ThunkDispatch<Promise<void>, {}, UploadImageFromVideo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImageFromVideo>) => {
        await VodGeneralServices.uploadImageFromVideo(vodId, time, imageType)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE_FROM_VIDEO, payload: response.data })
                dispatch(showToastNotification(`${imageType} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteFileAction = (vodId: string, targetId: string, fileName: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await VodGeneralServices.deleteFile(vodId, targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: {id: targetId} })
                dispatch(showToastNotification(`${fileName} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const addSubtitleAction = (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, vodId: string): ThunkDispatch<Promise<void>, {}, AddVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddVodSubtitle>) => {
        await VodGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}



export const deleteSubtitleAction = (vodId: string, targetId: string, fileName: string): ThunkDispatch<Promise<void>, {}, DeleteVodSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteVodSubtitle>) => {
        await VodGeneralServices.deleteFile(vodId, targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_VOD_SUBTITLE, payload: {targetID: targetId, vodId: vodId} })
                dispatch(showToastNotification(`${fileName} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetVodDetails | EditVodDetails | AddVodSubtitle | EditVodSubtitle | DeleteVodSubtitle | GetUploadUrl | UploadImage | UploadImageFromVideo | DeleteImage | GetVodList | PostVod | DeleteVod