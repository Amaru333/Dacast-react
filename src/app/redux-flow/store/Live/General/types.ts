import { FeaturesList } from '../../../../shared/Common/Features';

export enum ActionTypes {
    GET_LIVE_DETAILS = "@@live_general/GET_LIVE_DETAILS",
    GET_LIVE_LIST = "@@live_general/GET_LIVE_LIST",
    SAVE_LIVE_DETAILS = "@@live_general/SAVE_LIVE_DETAILS",
    DELETE_LIVE_CHANNEL = "@@live_list/DELETE_LIVE_CHANNEL",
    GET_UPLOAD_URL = "@@live_general/GET_UPLOAD_URL",
    UPLOAD_IMAGE = "@@live_general/UPLOAD_IMAGE",
    DELETE_IMAGE = "@@live_general/DELETE_IMAGE",
}

interface AssetType {
    assetGroupID: string;
    targetType: string;
    targetID: string;
    url: string;
}

export interface LiveDetails {
    id: string;
    streamOnline: boolean;
    title: string;
    folder: string[];
    username: string;
    password: string;
    streamKeys: string[];
    primaryPublishURL: string;
    backupPublishURL: string;
    playbackURLs: PLaybackURLs;
    description: string;
    thumbnail?: AssetType;
    splashscreen?: AssetType;
    poster?: AssetType;
    recording: boolean;
    countdown: LiveStreamCountdown;
    rewind: boolean;
}

interface PLaybackURLs {
    hls: string;
}

export interface LiveItem {
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
    results: LiveItem[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
}

interface LiveStreamCountdown {
    enabled?: boolean;
    startDate?: number;
    startTime?: number;
    timezone?: string;
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

export const initialLiveGeneralState: LiveDetails = {
    id: null,
    streamOnline: false,
    username: null,
    password: null,
    playbackURLs: null,
    primaryPublishURL: null,
    backupPublishURL: null,
    streamKeys: null,
    title: null,
    folder: null,
    description: null,
    thumbnail: null,
    splashscreen: null,
    recording: false,
    rewind: false,
    countdown: {
        enabled: false
    }
}

export const initialLiveList: SearchResult | false = false