export enum ActionTypes {
    GET_LIVE_DETAILS = "@@live_general/GET_LIVE_DETAILS",
    SAVE_LIVE_DETAILS = "@@live_general/SAVE_LIVE_DETAILS"
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