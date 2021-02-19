import { GetExpoAssetUploadUrl } from "./expo"
import { GetLiveAssetUploadUrl, GetLiveBrandImageUrl } from "./live"
import { GetPlaylistAssetUploadUrl } from "./playlist"
import { EngagementSettingsEndoint, PutAdInput } from "./settings"
import { GetVideoAssetUploadUrl, GetVideoSubtitleUploadUrl, GetVodBrandImageUrl } from "./video"

export interface GetCompanyLogoUploadUrl {
    userID: string
}

export interface GetUserBrandImageUploadUrl {
    userID: string
}

export type ContentUploadType = 'subtitle' | 'vod-thumbnail' | 'vod-splashscreen' | 'vod-poster' | 'live-thumbnail' | 'live-splashscreen' | 'live-poster' | 'playlist-thumbnail' | 'playlist-splashscreen' | 'playlist-poster' | 'expo-poster'

export type PostUploadUrlInput = {
    uploadType: 'company-logo' | 'transcoding-watermark' | 'player-watermark' | ContentUploadType
    uploadRequestBody: GetCompanyLogoUploadUrl | GetUserBrandImageUploadUrl | GetVodBrandImageUrl | GetLiveBrandImageUrl | GetExpoAssetUploadUrl | GetLiveAssetUploadUrl | GetPlaylistAssetUploadUrl | GetVideoAssetUploadUrl | GetVideoSubtitleUploadUrl | null
}

export interface PostUploadUrlOutput {
    presignedURL: string
    fileID?: string
    targetID?: string
}

export interface PutUploadFileInput {
    uploadUrl: string
    data: File
}

interface FeaturesList {
    paywall?: boolean;
    recording?: boolean;
    playlist?: boolean;  
    rewind?: boolean;
    advertising?: boolean;
    folder?: boolean;
}

export interface AssetEndpoint {
    ownerID: string;
    objectID: string;
    createdAt: number;
    title: string;
    type: 'expo' | 'vod' | 'channel' | 'playlist' | 'folder';
    status?: 'deleted' | 'offline' | 'online' | 'processing';
    size?: number;
    duration?: number;
    thumbnail?: string;
    views?: number;
    featuresList?: FeaturesList;
    channelType?: string;
    folderGroupID?: string;
    parentID?: string;
    name?: string;
    path?: string;
    splitPath?: string;
}

export interface GetSearchContentOutput {
    totalResults: number;
    results: AssetEndpoint[];
    perPage: number;
    pageNumber: number;
}

export interface BulkActionItem {
    id: string;
    contentType: 'rendition' | 'vod' | 'channel' | 'playlist' | 'expos';
    name?: string;
}

export interface PostBulkActionInput {
    action: 'delete' | 'theme' | 'online' | 'paywall' | 'create';
    items: BulkActionItem[];
    targetValue?: string | boolean;

}

interface BulkItemAdditionResponseField {
    status: number;
    error?: string;
}

type BulkActionReponseItem = BulkActionItem & BulkItemAdditionResponseField

export interface PostBulkActionOutput {
    attempted: number;
    action: string;
    errors: boolean;
    items: BulkActionReponseItem[]
}

export type PutContentEngagementSettingsInput = EngagementSettingsEndoint & {id: string}

export interface PutContentLockEngagementSettingsInput {
    id: string;
    section: 'brand-image' | 'ads' | 'brand-text' | 'end-screen-text';
    action: 'lock' | 'unlock';
}

export type PutContentAdsInput = {data: PutAdInput} & {id: string}

export interface AssetTypeEndpoint {
    url?: string
    targetID?: string
    targetType?: 'splashscreen' | 'thumbnail' | 'poster'
    assetId?: string
}

export interface DeleteContentImageAssetIdInput {
    id: string
    targetId: string
}