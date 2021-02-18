import { ActionTypes, ContentDetails, SubtitleInfo, AssetType } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { showToastNotification } from '../../Toasts'
import { ContentGeneralServices } from './services'
import { applyViewModel, parseContentType } from '../../../../utils/utils'
import { capitalizeFirstLetter } from '../../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { ContentType } from "../../Common/types"
import { fomatPostExpoAssetUploadOutput, fomatPostLiveAssetUploadOutput, fomatPostPlaylistAssetUploadOutput, fomatPostVodAssetUploadOutput, formatGetContentDetailsInput, formatGetExpoDetailsOutput, formatGetLiveDetailsOutput, formatGetPlaylistDetailsOutput, formatGetVideoDetailsOutput, formatPostEncoderKeyInput, formatPostEncoderKeyOutput, formatPostExpoAssetUploadUrlInput, formatPostLiveAssetUploadUrlInput, formatPostPlaylistAssetUploadUrlInput, formatPostVodAssetUploadUrlInput, formatPutExpoDetailsInput, formatPutExpoDetailsOutput, formatPutLiveDetailsInput, formatPutLiveDetailsOutput, formatPutPlaylistDetailsInput, formatPutPlaylistDetailsOutput, formatPutVideoDetailsInput, formatPutVideoDetailsOutput } from "./viewModel"
import { formatPutUploadFileInput } from "../../Common/viewModel"

export interface GetContentDetails {
    type: ActionTypes.GET_CONTENT_DETAILS;
    payload: ContentDetails & {contentType: ContentType}
}

export interface EditContentDetails {
    type: ActionTypes.EDIT_CONTENT_DETAILS;
    payload: ContentDetails & {contentType: ContentType};
}

export interface AddContentSubtitle {
    type: ActionTypes.ADD_CONTENT_SUBTITLE;
    payload: {contentId: string; data: SubtitleInfo; contentType: string};
}

export interface EditContentSubtitle {
    type: ActionTypes.EDIT_CONTENT_SUBTITLE;
    payload: SubtitleInfo;
}

export interface DeleteContentSubtitle {
    type: ActionTypes.DELETE_CONTENT_SUBTITLE;
    payload: {targetID: string; contentId: string; contentType: string};
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: { contentId: string; url: string, contentType: string, data?: SubtitleInfo };
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {contentId: string, contentType: string};
}

export interface UploadImageFromVideo {
    type: ActionTypes.UPLOAD_IMAGE_FROM_VIDEO;
    payload: AssetType;
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {id: string, contentId: string, contentType: string};
}

export interface GenerateEncoderKey {
    type: ActionTypes.GENERATE_ENCODER_KEY;
    payload: {encoderKey: string, contentId: string; contentType: string}
}

export const getContentDetailsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodDetails, formatGetContentDetailsInput, formatGetVideoDetailsOutput(contentType), ActionTypes.GET_CONTENT_DETAILS, null, 'Couldn\'t get video info')
        case 'live':
            return applyViewModel(dacastSdk.getChannelDetails, formatGetContentDetailsInput, formatGetLiveDetailsOutput(contentType), ActionTypes.GET_CONTENT_DETAILS, null, 'Couldn\'t get channel info')
        case 'playlist': 
            return applyViewModel(dacastSdk.getPlaylistDetails, formatGetContentDetailsInput, formatGetPlaylistDetailsOutput(contentType), ActionTypes.GET_CONTENT_DETAILS, null, 'Couldn\'t get playlist info')
        case 'expo': 
            return applyViewModel(dacastSdk.getExpoDetails, formatGetContentDetailsInput, formatGetExpoDetailsOutput(contentType), ActionTypes.GET_CONTENT_DETAILS, null, 'Couldn\'t get expo info')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const editContentDetailsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodDetails, formatPutVideoDetailsInput, formatPutVideoDetailsOutput(contentType), ActionTypes.EDIT_CONTENT_DETAILS, 'Changes saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putChannelDetails, formatPutLiveDetailsInput, formatPutLiveDetailsOutput(contentType), ActionTypes.EDIT_CONTENT_DETAILS, 'Changes saved', 'Couldn\'t save changes')
        case 'playlist': 
            return applyViewModel(dacastSdk.putPlaylistDetails, formatPutPlaylistDetailsInput, formatPutPlaylistDetailsOutput(contentType), ActionTypes.EDIT_CONTENT_DETAILS, 'Changes saved', 'Couldn\'t save changes')
        case 'expo': 
            return applyViewModel(dacastSdk.putExpoDetails, formatPutExpoDetailsInput, formatPutExpoDetailsOutput(contentType), ActionTypes.EDIT_CONTENT_DETAILS, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const getUploadUrlAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.postUploadUrl, formatPostVodAssetUploadUrlInput, fomatPostVodAssetUploadOutput(contentType), ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
        case 'live':
            return applyViewModel(dacastSdk.postUploadUrl, formatPostLiveAssetUploadUrlInput, fomatPostLiveAssetUploadOutput(contentType), ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
        case 'playlist': 
            return applyViewModel(dacastSdk.postUploadUrl, formatPostPlaylistAssetUploadUrlInput, fomatPostPlaylistAssetUploadOutput(contentType), ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
        case 'expo':
            return applyViewModel(dacastSdk.postUploadUrl, formatPostExpoAssetUploadUrlInput, fomatPostExpoAssetUploadOutput(contentType), ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const uploadFileAction = applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, undefined, ActionTypes.UPLOAD_IMAGE, 'File uploaded', 'Couldn\'t upload file')


export const generateEncoderKeyAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'live': 
            return applyViewModel(dacastSdk.postEncoderKey, formatPostEncoderKeyInput, formatPostEncoderKeyOutput(contentType), ActionTypes.GENERATE_ENCODER_KEY, 'Encoder key generated', 'Couldn\'t generate encoder key')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const uploadImageFromVideoAction = (contentId: string, time: number, imageType: string): ThunkDispatch<Promise<void>, {}, UploadImageFromVideo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImageFromVideo>) => {
        await ContentGeneralServices.uploadImageFromVideo(contentId, time, imageType)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE_FROM_VIDEO, payload: response.data })
                dispatch(showToastNotification(`${capitalizeFirstLetter(imageType)} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export const deleteFileAction = (contentId: string, targetId: string, contentType: string, imageType: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await ContentGeneralServices.deleteFile(contentId, targetId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: {contentId: contentId, id: targetId, contentType: contentType} })
                dispatch(showToastNotification(`${contentType === "expo" ? 'Header' : capitalizeFirstLetter(imageType)} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export const addSubtitleAction = (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, AddContentSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddContentSubtitle>) => {
        await ContentGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.ADD_CONTENT_SUBTITLE, payload: {contentId: contentId, contentType: contentType, data: {...subtitleInfo, url: subtitleInfo.targetID ? `https://universe-files.dacast.com/${subtitleInfo.targetID}` : null}}})

                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}



export const deleteSubtitleAction = (contentId: string, targetId: string, fileName: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContentSubtitle> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContentSubtitle>) => {
        await ContentGeneralServices.deleteFile(contentId, targetId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_CONTENT_SUBTITLE, payload: {targetID: targetId, contentId: contentId, contentType: contentType} })
                dispatch(showToastNotification(`${fileName} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export type Action = GetContentDetails | EditContentDetails | AddContentSubtitle | EditContentSubtitle | DeleteContentSubtitle | GetUploadUrl | UploadImage | UploadImageFromVideo | DeleteImage | GenerateEncoderKey