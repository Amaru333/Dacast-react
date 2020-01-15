export enum ActionTypes {
    GET_VOD_DETAILS = "@@vod_general/GET_VOD_DETAILS",
    POST_VOD = "@@vod_general/POST_VOD",
    DELETE_VOD = "@@vod_general/DELETE_VOD",
    GET_VOD_LIST = "@@vod_list/GET_VOD_LIST",
    EDIT_VOD_DETAILS = "@@vod_general/EDIT_VOD_DETAILS",
    ADD_VOD_SUBTITLE = "@@vod_general/ADD_VOD_SUBTITLE",
    EDIT_VOD_SUBTITLE = "@@vod_general/EDIT_VOD_SUBTITLE",
    DELETE_VOD_SUBTITLE = "@@vod_general/DELETE_VOD_SUBTITLE",
    CHANGE_VOD_THUMBNAIL = "@@vod_general/CHANGE_VOD_THUMBNAIL"
}

export interface VodDetails {
    id: string;
    online: boolean;
    title: string;
    folder: string;
    description: string;
    thumbnail: string;
    subtitles: SubtitleInfo[];
}

export interface VodItem {
    id: number;
    online: boolean;
    title: string;
    size: number;
    views: number;
    thumbnail: string;
    created: number;
    features: FeaturesList;
}

export interface FeaturesList {
    paywall: boolean;
    folder: boolean;
    playlist: boolean;
}

export interface SubtitleInfo {
    id: string;
    fileName: string;
    language: string;
}

export interface ThumbnailUpload {
    thumbnail: File | string;
}