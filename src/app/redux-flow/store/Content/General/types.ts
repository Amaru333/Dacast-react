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
    GENERATE_ENCODER_KEY = "@@content_general/GENERATE_ENCODER_KEY"
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
    unsecureM3u8Url?: string;
    appearance?: Appearance;
    encoderKey?: string;
}

interface Appearance {
    fontColor: string;
    headerColor: string;
}

interface PLaybackURLs {
    hls: string;
}

interface LiveStreamCountdown {
    startTime: number;
    timezone?: string;
}

export interface SubtitleInfo {
    targetID: string;
    name: string;
    languageLongName: string;
    languageShortName: string;
    url?: string;
    convertToUTF8?: boolean;
}

export interface DateTimeValue {
    date: string;
    time: string;
    timezone: string;
}

export const initialContentGeneralState: ContentDetailsState = {};