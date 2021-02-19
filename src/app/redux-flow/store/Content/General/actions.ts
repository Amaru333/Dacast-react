import { ActionTypes, ContentDetails, SubtitleInfo, AssetType } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { showToastNotification } from '../../Toasts'
import { ContentGeneralServices } from './services'
import { applyViewModel, parseContentType } from '../../../../utils/utils'
import { capitalizeFirstLetter } from '../../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { ContentType } from "../../Common/types"
import { fomatPostExpoAssetUploadOutput, fomatPostLiveAssetUploadOutput, fomatPostPlaylistAssetUploadOutput, fomatPostVodAssetUploadOutput, formatDeleteContentImageAssetInput, formatDeleteContentImagesAssetOutput, formatGetContentDetailsInput, formatGetExpoDetailsOutput, formatGetLiveDetailsOutput, formatGetPlaylistDetailsOutput, formatGetVideoDetailsOutput, formatPostEncoderKeyInput, formatPostEncoderKeyOutput, formatPostExpoAssetUploadUrlInput, formatPostLiveAssetUploadUrlInput, formatPostPlaylistAssetUploadUrlInput, formatPostUploadImageFromVideoInput, formatPostVodAssetUploadUrlInput, formatPutExpoDetailsInput, formatPutExpoDetailsOutput, formatPutLiveDetailsInput, formatPutLiveDetailsOutput, formatPutPlaylistDetailsInput, formatPutPlaylistDetailsOutput, formatPutSubtitleInput, formatPutSubtitleOutput, formatPutUploadFileOutput, formatPutVideoDetailsInput, formatPutVideoDetailsOutput } from "./viewModel"
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

export const uploadFileAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, formatPutUploadFileOutput(contentType), ActionTypes.UPLOAD_IMAGE, 'File uploaded', 'Couldn\'t upload file')
        case 'live':
            return applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, formatPutUploadFileOutput(contentType), ActionTypes.UPLOAD_IMAGE, 'File uploaded', 'Couldn\'t upload file')
        case 'playlist': 
            return applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, formatPutUploadFileOutput(contentType), ActionTypes.UPLOAD_IMAGE, 'File uploaded', 'Couldn\'t upload file')
        case 'expo':
            return applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, formatPutUploadFileOutput(contentType), ActionTypes.UPLOAD_IMAGE, 'File uploaded', 'Couldn\'t upload file')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const generateEncoderKeyAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'live': 
            return applyViewModel(dacastSdk.postEncoderKey, formatPostEncoderKeyInput, formatPostEncoderKeyOutput(contentType), ActionTypes.GENERATE_ENCODER_KEY, 'Encoder key generated', 'Couldn\'t generate encoder key')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const uploadImageFromVideoAction = applyViewModel(dacastSdk.postUploadImageFromVideo, formatPostUploadImageFromVideoInput, undefined, ActionTypes.UPLOAD_IMAGE_FROM_VIDEO, 'Image uploaded from video', 'Couldn\'t upload image from video')

export const deleteFileAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.deleteVodImageAsset, formatDeleteContentImageAssetInput, formatDeleteContentImagesAssetOutput(contentType), ActionTypes.DELETE_IMAGE, 'Image deleted', 'Couldn\'t delete image')
        case 'live':
            return applyViewModel(dacastSdk.deleteChannelImageAsset, formatDeleteContentImageAssetInput, formatDeleteContentImagesAssetOutput(contentType), ActionTypes.DELETE_IMAGE, 'Image deleted', 'Couldn\'t delete image')
        case 'playlist': 
            return applyViewModel(dacastSdk.deletePlaylistImageAsset, formatDeleteContentImageAssetInput, formatDeleteContentImagesAssetOutput(contentType), ActionTypes.DELETE_IMAGE, 'Image deleted', 'Couldn\'t delete image')
        case 'expo':
            return applyViewModel(dacastSdk.deleteExpoImageAsset, formatDeleteContentImageAssetInput, formatDeleteContentImagesAssetOutput(contentType), ActionTypes.DELETE_IMAGE, 'Image deleted', 'Couldn\'t delete image')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const addSubtitleAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putUploadFile, formatPutSubtitleInput, formatPutSubtitleOutput(contentType), ActionTypes.ADD_CONTENT_SUBTITLE, 'Subtitle added', 'Couldn\'t add subtitle')
        default:
            throw new Error('Error applying put lock content view model')
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