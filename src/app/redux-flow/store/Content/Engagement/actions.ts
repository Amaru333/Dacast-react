
import { ActionTypes } from './types';
import { Ad, ContentEngagementSettings } from '../../Settings/Engagement';
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { ContentType } from '../../Common/types';
import { formatGetContentEngagementSettingsInput, formatGetContentEngagementSettingsOutput, formatPostContentBrandImageUrlOutput, formatPostLiveBrandImageUrlInput, formatPostVodBrandImageUrlInput, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput, formatPutContentEngagementInput, formatPutContentEngagementOutput, formatPutContentLockEngagementSettingsInput } from './viewModel';
import { formatPutUploadFileInput } from '../../Common/viewModel';

export interface GetContentEngagementSettings {
    type: ActionTypes.GET_CONTENT_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings & {contentType: ContentType};
}

export interface SaveContentEngagementSettings {
    type: ActionTypes.SAVE_CONTENT_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings & {contentType: ContentType};
}

export interface LockSection {
    type: ActionTypes.LOCK_SECTION;
    payload: ContentEngagementSettings & {contentType: ContentType};
}

export interface SaveContentAd {
    type: ActionTypes.SAVE_CONTENT_AD;
    payload: {ads: Ad[]; contentId: string; contentType: ContentType;};
}

export interface CreateContentAd {
    type: ActionTypes.CREATE_CONTENT_AD;
    payload: {ads: Ad[], adsId: string; contentId: string; contentType: ContentType;};
}

export interface DeleteContentAd {
    type: ActionTypes.DELETE_CONTENT_AD;
    payload:{ads: Ad[]; contentId: string; contentType: ContentType;}; 
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: {presignedURL: string, contentId: string; contentType: ContentType };
}

export interface UploadContentImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {file: File};
}

export interface DeleteContentImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {file: File};
}

export const getContentEngagementSettingsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodEngagementSettings, formatGetContentEngagementSettingsInput, formatGetContentEngagementSettingsOutput(contentType), ActionTypes.GET_CONTENT_ENGAGEMENT_SETTINGS, null, 'Couldn\'t get engagement settings')
        case 'live':
            return applyViewModel(dacastSdk.getChannelEngagementSettings, formatGetContentEngagementSettingsInput, formatGetContentEngagementSettingsOutput(contentType), ActionTypes.GET_CONTENT_ENGAGEMENT_SETTINGS, null, 'Couldn\'t get engagement settings')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const saveContentEngagementSettingsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodEngagementSettings, formatPutContentEngagementInput, formatPutContentEngagementOutput(contentType), ActionTypes.SAVE_CONTENT_ENGAGEMENT_SETTINGS, 'Changes have been saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putChannelEngagementSettings, formatPutContentEngagementInput, formatPutContentEngagementOutput(contentType), ActionTypes.SAVE_CONTENT_ENGAGEMENT_SETTINGS, 'Changes have been saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying put content view model')
    }
}

export const lockSectionAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodLockEngagementSettings, formatPutContentLockEngagementSettingsInput, undefined, ActionTypes.LOCK_SECTION, 'Changes have been saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putChannelLockEngagementSettings, formatPutContentLockEngagementSettingsInput, undefined, ActionTypes.LOCK_SECTION, 'Changes have been saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const saveContentAdAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodAds, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput(contentType), ActionTypes.SAVE_CONTENT_AD, 'Ad has been saved', 'Couldn\'t save ad')
        case 'live':
            return applyViewModel(dacastSdk.putChannelAds, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput(contentType), ActionTypes.SAVE_CONTENT_AD, 'Ad has been saved', 'Couldn\'t save ad')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const createContentAdAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodAds, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput(contentType), ActionTypes.CREATE_CONTENT_AD, 'Ad has been created', 'Couldn\'t create ad')
        case 'live':
            return applyViewModel(dacastSdk.putChannelAds, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput(contentType), ActionTypes.CREATE_CONTENT_AD, 'Ad has been created', 'Couldn\'t create ad')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const deleteContentAdAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodAds, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput(contentType), ActionTypes.DELETE_CONTENT_AD, 'Ad has been deleted', 'Couldn\'t delete ad')
        case 'live':
            return applyViewModel(dacastSdk.putChannelAds, formatPutContentAdsSettingsInput, formatPutContentAdsSettingsOutput(contentType), ActionTypes.DELETE_CONTENT_AD, 'Ad has been deleted', 'Couldn\'t delete ad')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const getUploadUrlAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.postUploadUrl, formatPostVodBrandImageUrlInput, formatPostContentBrandImageUrlOutput(contentType), ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
        case 'live':
            return applyViewModel(dacastSdk.postUploadUrl, formatPostLiveBrandImageUrlInput, formatPostContentBrandImageUrlOutput(contentType), ActionTypes.GET_UPLOAD_URL, null, 'Couldn\'t upload file')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const uploadContentImageAction = applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, undefined, ActionTypes.UPLOAD_IMAGE, 'Brand image has been uploaded', 'Couldn\'t upload brand image')

export const deleteContentImageAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.deleteVodBrandImage, (data: string) => data, undefined, ActionTypes.DELETE_IMAGE, 'Brand image has been deleted', 'Couldn\'t delete brand image')
        case 'live':
            return applyViewModel(dacastSdk.deleteChannelBrandImage, (data: string) => data, undefined, ActionTypes.DELETE_IMAGE, 'Brand image has been deleted', 'Couldn\'t delete brand image')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export type Action = GetContentEngagementSettings | SaveContentEngagementSettings | LockSection | SaveContentAd | CreateContentAd | DeleteContentAd | GetUploadUrl | UploadContentImage | DeleteContentImage