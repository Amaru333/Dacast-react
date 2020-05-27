import { FeaturesList } from '../../../../shared/Common/Features'

export enum ActionTypes {
    GET_VOD_DETAILS = "@@vod_general/GET_VOD_DETAILS",
    POST_VOD = "@@vod_general/POST_VOD",
    DELETE_VOD = "@@vod_general/DELETE_VOD",
    GET_VOD_LIST = "@@vod_list/GET_VOD_LIST",
    EDIT_VOD_DETAILS = "@@vod_general/EDIT_VOD_DETAILS",
    ADD_VOD_SUBTITLE = "@@vod_general/ADD_VOD_SUBTITLE",
    EDIT_VOD_SUBTITLE = "@@vod_general/EDIT_VOD_SUBTITLE",
    DELETE_VOD_SUBTITLE = "@@vod_general/DELETE_VOD_SUBTITLE",
    GET_UPLOAD_URL = "@@vod_general/GET_UPLOAD_URL",
    UPLOAD_IMAGE = "@@vod_general/UPLOAD_IMAGE",
    DELETE_IMAGE = "@@vod_general/DELETE_IMAGE",
}

interface AssetType {
    assetGroupID: string;
    targetType: string;
    targetID: string;
    url: string;
}

export interface VodDetailsState { [key: string]: VodDetails }

export interface VodDetails {
    id: string;
    online: boolean;
    title: string;
    description: string;
    folders: string[];
    thumbnail: AssetType;
    splashscreen: AssetType;
    poster?: AssetType;
    subtitles: SubtitleInfo[];
    uploadurl: string;
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
    featuresList?: FeaturesList;
}

export interface SearchResult {
    results: VodItem[];
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
}