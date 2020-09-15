import { FeaturesList } from '../../../../shared/Common/Features';

export enum ActionTypes {
    GET_CONTENT_DETAILS = "@@content_general/GET_CONTENT_DETAILS",
    POST_CONTENT = "@@content_general/POST_CONTENT",
    DELETE_CONTENT = "@@content_general/DELETE_CONTENT",
    GET_CONTENT_LIST = "@@content_list/GET_CONTENT_LIST",
    EDIT_CONTENT_DETAILS = "@@content_general/EDIT_CONTENT_DETAILS",
    ADD_CONTENT_SUBTITLE = "@@content_general/ADD_CONTENT_SUBTITLE",
    EDIT_CONTENT_SUBTITLE = "@@content_general/EDIT_CONTENT_SUBTITLE",
    DELETE_CONTENT_SUBTITLE = "@@content_general/DELETE_CONTENT_SUBTITLE",
    GET_UPLOAD_URL = "@@content_general/GET_UPLOAD_URL",
    UPLOAD_IMAGE = "@@content_general/UPLOAD_IMAGE",
    UPLOAD_IMAGE_FROM_VIDEO = "@@content_general/UPLOAD_IMAGE_FROM_VIDEO",
    DELETE_IMAGE = "@@content_general/DELETE_IMAGE",
}

export interface AssetType {
    assetGroupID: string;
    targetType: string;
    targetID: string;
    url: string;
}

export interface ContentDetailsState { 
    [contentType: string]: {
        [contentId: string]: ContentDetails
    } 
}

export interface ContentDetails {
    id: string;
    online: boolean;
    title: string;
    downloadURL?: string;
    description: string;
    folders: string[];
    thumbnail?: AssetType;
    splashscreen?: AssetType;
    poster?: AssetType;
    subtitles?: SubtitleInfo[];
    uploadurl: string;
    embedType?: string;
    embedScaling?: string;
    embedSize?: number;
    username?: string;
    password?: string;
    streamKeys?: string[];
    primaryPublishURL?: string;
    backupPublishURL?: string;
    playbackURLs?: PLaybackURLs;
    recording?: boolean;
    countdown?: LiveStreamCountdown;
    rewind?: boolean;
    m3u8?: m3u8;
}

interface m3u8 {
    enabled: boolean;
    link: string;
}

interface PLaybackURLs {
    hls: string;
}

interface LiveStreamCountdown {
    startTime: number;
    timezone?: string;
}

export interface ContentItem {
    ownerID: string;
    objectID: string;
    type: string;
    status: string;
    title: string;
    size: number;
    views?: number;
    duration: number;
    thumbnail?: string;
    createdAt: number;
    featuresList?: FeaturesList;
}

export interface SearchResult {
    results: ContentItem[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
}

export interface SubtitleInfo {
    targetID: string;
    name: string;
    languageLongName: string;
    languageShortName: string;
    url?: string;
    convertToUTF8?: boolean;
}

export const initialContentGeneralState: ContentDetailsState = {};

export const initialContentList: SearchResult | false = false