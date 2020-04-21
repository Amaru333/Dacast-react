import { FeaturesList } from '../../../../shared/Common/Features';

export enum ActionTypes {
    GET_VOD_DETAILS = "@@vod_general/GET_VOD_DETAILS",
    POST_VOD = "@@vod_general/POST_VOD",
    DELETE_VOD = "@@vod_general/DELETE_VOD",
    GET_VOD_LIST = "@@vod_list/GET_VOD_LIST",
    EDIT_VOD_DETAILS = "@@vod_general/EDIT_VOD_DETAILS",
    ADD_VOD_SUBTITLE = "@@vod_general/ADD_VOD_SUBTITLE",
    EDIT_VOD_SUBTITLE = "@@vod_general/EDIT_VOD_SUBTITLE",
    DELETE_VOD_SUBTITLE = "@@vod_general/DELETE_VOD_SUBTITLE",
    CHANGE_VOD_THUMBNAIL = "@@vod_general/CHANGE_VOD_THUMBNAIL",
    CHANGE_VOD_SPLASHSCREEN = "@@vod_general/CHANGE_VOD_SPLASHSCREEN",
    CHANGE_VOD_POSTER = "@@vod_general/CHANGE_VOD_POSTER",
    DELETE_VOD_POSTER = "@@vod_general/DELETE_VOD_POSTER"
}
export interface VodMetadata {
    id: string;
    online: boolean;
    title: string;
    description: string;
}
export interface VodDetails {
    metadata: VodMetadata;
    folder?: string[];
    thumbnail: string;
    splashscreen: string;
    poster?: string;
    subtitles: SubtitleInfo[];
}

export interface VodItem {
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
    features?: FeaturesList;
}

export interface SearchResult {
    results: VodItem[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
}

export interface SubtitleInfo {
    id: string;
    fileName: string;
    language: string;
}

export interface ThumbnailUpload {
    thumbnail: File | string;
}

export interface SplashscreenUpload {
    splashscreen: File | string;
}

export interface PosterUpload {
    poster: File | string;
}