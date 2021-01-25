import { ActionTypes, EngagementInfo, Ad, MailCatcher } from "./types";
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetEngagementOutput, formatPostUserBrandImageUrlInput, formatPutAdsSettingsInput, formatPutEngagementInput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';
import { PostUploadUrlOutput } from '../../../../../DacastSdk/common';
import { formatPutUploadFileInput } from '../../Common/viewModel';

export interface GetSettingsEngagementInfos {
    type: ActionTypes.GET_SETTINGS_ENGAGEMENT_INFOS;
    payload: EngagementInfo;
}

export interface SaveSettingsEngagementInfos {
    type: ActionTypes.SAVE_SETTINGS_ENGAGEMENT_INFOS;
    payload: EngagementInfo;
}

export interface SaveAd {
    type: ActionTypes.SAVE_AD;
    payload: Ad[];
}

export interface CreateAd {
    type: ActionTypes.CREATE_AD;
    payload: Ad[];
}

export interface DeleteAd {
    type: ActionTypes.DELETE_AD;
    payload: Ad[];
}

export interface SaveMailCatcher {
    type: ActionTypes.SAVE_MAIL_CATCHER;
    payload: MailCatcher;
}

export interface CreateMailCatcher {
    type: ActionTypes.CREATE_MAIL_CATCHER;
    payload: MailCatcher;
}

export interface DeleteMailCatcher {
    type: ActionTypes.DELETE_MAIL_CATCHER;
    payload: MailCatcher;
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: {presignedURL: string };
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
}

export type Action = GetSettingsEngagementInfos | SaveSettingsEngagementInfos | SaveAd | CreateAd | DeleteAd | SaveMailCatcher | CreateMailCatcher | DeleteMailCatcher | GetUploadUrl | UploadImage | DeleteImage

export const getSettingsEngagementInfosAction = applyViewModel(dacastSdk.getEngagementSettings, undefined, formatGetEngagementOutput, ActionTypes.GET_SETTINGS_ENGAGEMENT_INFOS, null, 'Couldn\'t get engagement settings')
export const saveSettingsEngagementInfosAction = applyViewModel(dacastSdk.putEngagementSettings, formatPutEngagementInput, undefined, ActionTypes.SAVE_SETTINGS_ENGAGEMENT_INFOS, 'Engagement settings saved', 'Couldn\'t save engagement settings')

export const saveAdAction = applyViewModel(dacastSdk.putAdsSettings, formatPutAdsSettingsInput, undefined, ActionTypes.SAVE_AD, 'Ad saved', 'Couldn\'t save ad')
export const createAdAction = applyViewModel(dacastSdk.putAdsSettings, formatPutAdsSettingsInput, undefined, ActionTypes.CREATE_AD, 'Ad created', 'Couldn\'t create ad')
export const deleteAdAction = applyViewModel(dacastSdk.putAdsSettings, formatPutAdsSettingsInput, undefined, ActionTypes.DELETE_AD, 'Ad deleted', 'Couldn\'t delete ad')

export const getUploadUrlAction = applyViewModel(dacastSdk.postUploadUrl, formatPostUserBrandImageUrlInput, (data: PostUploadUrlOutput) => data, ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
export const uploadFileAction = applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, undefined, ActionTypes.UPLOAD_IMAGE, 'Brand image has been uploaded', 'Couldn\'t upload brand image')
export const deleteFileAction = applyViewModel(dacastSdk.deleteUserBrandImage, undefined, undefined, ActionTypes.DELETE_IMAGE, 'Brand image has been deleted', 'Couldn\'t delete brand image')