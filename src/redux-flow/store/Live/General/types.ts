export enum ActionTypes {
    GET_LIVE_DETAILS = "@@live_general/GET_LIVE_DETAILS",
    GET_LIVE_LIST = "@@live_list/GET_LIVE_LIST",
    SAVE_LIVE_DETAILS = "@@live_general/SAVE_LIVE_DETAILS",
    DELETE_LIVE_CHANNEL = "@@live_list/DELETE_LIVE_CHANNEL"
}

export interface LiveDetails {
    id: string;
    streamOnline: boolean;
    title: string;
    folder: string;
    description: string;
    thumbnail: string;
    splashscreen: string;
    poster?: string;
    recording: boolean;
    countdown: LiveStreamCountdown;
}

export interface LiveItem {
    id: string;
    streamOnline: boolean;
    title: string;
    created: number;
    thumbnail: string;
    features: LiveFeaturesList;
}

export interface LiveFeaturesList {
    recording: boolean;
    rewind: boolean;
    paywall: boolean;
    playlist: boolean;
    advertising: boolean;
}

interface LiveStreamCountdown {
    enabled: boolean;
    startDate?: string;
    startTime?: string;
    timezone?: string;
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