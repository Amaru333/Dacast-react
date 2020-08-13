import { ActionTypes, ContentDetails, SubtitleInfo, ContentItem, SearchResult, AssetType } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { showToastNotification } from '../../Toasts'
import { ContentGeneralServices } from './services'

export interface GetContentDetails {
    type: ActionTypes.GET_CONTENT_DETAILS;
    payload: {data: ContentDetails, contentType: "vod" | "live" | "playlist"};
}

export interface GetContentList {
    type: ActionTypes.GET_CONTENT_LIST;
    payload: {data: SearchResult, contentType: string};
}

export interface EditContentDetails {
    type: ActionTypes.EDIT_CONTENT_DETAILS;
    payload: {data: ContentDetails, contentType: string};
}

export interface AddContentSubtitle {
    type: ActionTypes.ADD_CONTENT_SUBTITLE;
    payload: {contentId: string; data: SubtitleInfo};
}

export interface EditContentSubtitle {
    type: ActionTypes.EDIT_CONTENT_SUBTITLE;
    payload: SubtitleInfo;
}

export interface DeleteContentSubtitle {
    type: ActionTypes.DELETE_CONTENT_SUBTITLE;
    payload: {targetID: string; contentId: string;};
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: { contentId: string; url: string, data: SubtitleInfo, contentType: string };
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {contentId: string, contentType: "vod" | "live" | "playlist"};
}

export interface UploadImageFromVideo {
    type: ActionTypes.UPLOAD_IMAGE_FROM_VIDEO;
    payload: AssetType;
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {id: string, contentId: string, contentType: "vod" | "live" | "playlist"};
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: {id: string};
}

export const deleteContentAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContent>) => {
        await ContentGeneralServices.deleteContentService(contentId, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_CONTENT, payload: {id: contentId, contentType: contentType} })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const getContentDetailsAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentDetails>) => {
        await ContentGeneralServices.getContentDetailsService(contentId, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.GET_CONTENT_DETAILS, payload: {data: response.data, contentType: contentType} })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    };
}

export const getContentListAction = (qs: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentList>) => {
        await ContentGeneralServices.getContentList(qs, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.GET_CONTENT_LIST, payload: {data: response.data, contentType: contentType} })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const editContentDetailsAction = (data: ContentDetails, contentType: string): ThunkDispatch<Promise<void>, {}, EditContentDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, EditContentDetails>) => {
        await ContentGeneralServices.editContentDetailsService(data, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.EDIT_CONTENT_DETAILS, payload: {data: response.data, contentType: contentType} })
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const getUploadUrlAction = (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await ContentGeneralServices.getUploadUrl(uploadType, contentId, extension, contentType, subtitleInfo)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload: {contentId: contentId, data: uploadType === 'subtitle' && {...subtitleInfo, targetID: response.data.data.fileID}, url: response.data.data.presignedURL}, contentType: contentType  })

            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadFileAction = (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string): ThunkDispatch<Promise<void>, {}, UploadImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImage>) => {
        await ContentGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: {contentId: contentId, contentType: contentType} })
                dispatch(showToastNotification(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadImageFromVideoAction = (contentId: string, time: number, imageType: string): ThunkDispatch<Promise<void>, {}, UploadImageFromVideo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImageFromVideo>) => {
        await ContentGeneralServices.uploadImageFromVideo(contentId, time, imageType)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE_FROM_VIDEO, payload: response.data })
                dispatch(showToastNotification(`${imageType.charAt(0).toUpperCase() + imageType.slice(1)} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteFileAction = (contentId: string, targetId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await ContentGeneralServices.deleteFile(contentId, targetId, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: {contentId: contentId, id: targetId, contentType: contentType} })
                dispatch(showToastNotification("Poster has been deleted", 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const addSubtitleAction = (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string): ThunkDispatch<Promise<void>, {}, AddContentSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddContentSubtitle>) => {
        await ContentGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.ADD_CONTENT_SUBTITLE, payload: {contentId: contentId, data: {...subtitleInfo, url: subtitleInfo.targetID ? `https://universe-files.dacast.com/${subtitleInfo.targetID}` : null}}})

                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}



export const deleteSubtitleAction = (contentId: string, targetId: string, fileName: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContentSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContentSubtitle>) => {
        await ContentGeneralServices.deleteFile(contentId, targetId, contentType)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_CONTENT_SUBTITLE, payload: {targetID: targetId, contentId: contentId} })
                dispatch(showToastNotification(`${fileName} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetContentDetails | EditContentDetails | AddContentSubtitle | EditContentSubtitle | DeleteContentSubtitle | GetUploadUrl | UploadImage | UploadImageFromVideo | DeleteImage | GetContentList | DeleteContent