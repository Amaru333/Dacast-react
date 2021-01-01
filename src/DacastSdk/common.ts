import { EngagementSettingsEndoint } from "./settings"

export interface GetCompanyLogoUploadUrl {
    userID: string
}

export interface GetUserBrandImageUploadUrl {
    userID: string
}

export type PostUploadUrlInput = {
    uploadType: 'company-logo' | 'transcoding-watermark' | 'player-watermark'
    uploadRequestBody: GetCompanyLogoUploadUrl | GetUserBrandImageUploadUrl | null
}

export interface PostUploadUrlOutput {
    presignedURL: string
    fileID?: string
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