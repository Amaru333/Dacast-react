import { FeaturesList } from '../../../../shared/Common/Features';

export enum ActionTypes {
    GET_LIVE_DETAILS = "@@live_general/GET_LIVE_DETAILS",
    GET_LIVE_LIST = "@@live_general/GET_LIVE_LIST",
    SAVE_LIVE_DETAILS = "@@live_general/SAVE_LIVE_DETAILS",
    CHANGE_LIVE_THUMBNAIL = "@@live_general/CHANGE_LIVE_THUMBNAIL",
    DELETE_LIVE_THUMBNAIL = "@@live_general/DELETE_LIVE_THUMBNAIL",
    CHANGE_LIVE_SPLASHSCREEN = "@@live_general/CHANGE_LIVE_SPLASHSCREEN",
    DELETE_LIVE_SPLASHSCREEN = "@@live_general/DELETE_LIVE_SPLASHSCREEN",
    CHANGE_LIVE_POSTER = "@@live_general/CHANGE_LIVE_POSTER",
    DELETE_LIVE_POSTER = "@@live_general/DELETE_LIVE_POSTER",
    DELETE_LIVE_CHANNEL = "@@live_list/DELETE_LIVE_CHANNEL"
}

export interface LiveDetails {
    id: string;
    streamOnline: boolean;
    title: string;
    folder: string[];
    description: string;
    thumbnail: string;
    splashscreen: string;
    poster?: string;
    recording: boolean;
    countdown: LiveStreamCountdown;
    rewind: boolean;
}

export interface LiveItem {
    id: string;
    streamOnline: boolean;
    title: string;
    created: number;
    thumbnail: string;
    features: FeaturesList;
}

interface LiveStreamCountdown {
    enabled: boolean;
    startDate?: string;
    startTime?: string;
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
    title: null,
    folder: null,
    description: null,
    thumbnail: null,
    splashscreen: null,
    recording: false,
    countdown: {
        enabled: false
    }
}

export const initialLiveList: LiveItem[] | false = false;