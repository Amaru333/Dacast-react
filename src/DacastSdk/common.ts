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