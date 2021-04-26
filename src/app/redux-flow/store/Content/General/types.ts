import { ContentType } from "../../Common/types";

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
    targetType?: string;
    targetID?: string;
    url?: string;
    assetId?: string;
}

export type ContentDetailsState = {
    [contentType in ContentType]: {
        [contentId: string]: ContentDetails;
    };
};

export interface VodDetails {
    id: string;
    online: boolean;
    title: string;
    description: string;
    folders: string[];
    thumbnail: AssetType;
    splashscreen: AssetType;
    poster: AssetType;
    subtitles: SubtitleInfo[];
    embedType: string;
    embedScaling: string;
    embedSize: number;
    uploadurl: string;
    tempSubtitleFileId?: string;
}

export interface LiveDetails {
    id: string
    online: boolean
    title: string
    description: string
    folders: string[]
    countdown: LiveStreamCountdown
    embedScaling: string
    embedSize: number
    embedType: string
    splashscreen: AssetType
    poster: AssetType
    thumbnail: AssetType
    unsecureM3u8Url: string
    recording: boolean
    rewind: boolean
    backupPublishURL: string
    username: string
    password: string
    primaryPublishURL: string
    streamKeys: string[]
    encoderKey: string
    uploadurl: string
}

export interface PlaylistDetails {
    id: string
    online: boolean
    title: string
    description: string
    folders: string[]
    embedScaling: string
    embedSize: number
    embedType: string
    poster: AssetType
    splashscreen: AssetType
    thumbnail: AssetType
    uploadurl: string
}

export interface ExpoDetails {
    id: string
    title: string
    description: string
    online: boolean
    appearance: Appearance
    poster: AssetType
    uploadurl: string
}

export type ContentDetails = VodDetails | LiveDetails | PlaylistDetails | ExpoDetails

interface Appearance {
    fontColor: string;
    headerColor: string;
}

interface LiveStreamCountdown {
    startTime: number | null;
    timezone?: string;
}

export interface SubtitleInfo {
    name: string;
    languageLongName: string;
    languageShortName: string;
    targetID?: string;
    url?: string;
    convertToUTF8?: boolean;
}

export interface DateTimeValue {
    date: number;
    timezone: string;
}

export const initialContentGeneralState: ContentDetailsState = {
    'vod': {},
    'live': {},
    'playlist': {},
    'expo': {}
};