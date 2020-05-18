export enum ActionTypes {
    GET_ANALYTICS_REALTIME_VIEWERS_TIME = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_VIEWERS_TIME",
    GET_ANALYTICS_REALTIME_PLAYBACK_TIME = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_PLAYBACK_TIME",
    GET_ANALYTICS_REALTIME_GB_TIME = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_GB_TIME",
    GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION",
    GET_ANALYTICS_REALTIME_JOB_IDS = "@@analytics_realtime/GET_ANALYTICS_REALTIME_JOB_IDS"
}

export interface GetAnalyticsRealtimeOptions {
    timePeriod: number;
    liveChannel: string;
}

export interface AnalyticsRealTimeInfos {
    concurentViewersPerTime: AnalyticsRealTimeViewersTime | false;
    newPlaybackSessionsPerTime: AnalyticsRealTimePlaybackTime | false;
    gbPerTime: AnalyticsRealTimePlaybackTime | false;
    consumptionPerLocation: AnalyticsRealTimeConsumptionLocation | false;
}

export interface AnalyticsRealTimeConsumptionLocation {
    data: {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
}

export interface AnalyticsRealTimeViewersTime {
    time: number[];
    data: number[];
}

export interface AnalyticsRealTimePlaybackTime {
    time: number[];
    data: number[];
}

export interface AnalyticsRealTimeGbTime {
    time: number[];
    data: number[];
}

export interface RealTimeJobIDs {
    concurentViewersPerTime: {
        jobID: string;
        error?: string;
        status?: string;
    };
    consumptionPerLocation: {
        jobID: string;
        error?: string;
        status?: string;
    };
    gbPerTime: {
        jobID: string;
        error?: string;
        status?: string;
    };
    newPlaybackSessionsPerTime: {
        jobID: string;
        error?: string;
        status?: string;
    };
    errors?: boolean;
}

export const AnalyticsRealTimeInitialState: AnalyticsRealTimeState = {
    data: {
        concurentViewersPerTime: false,
        newPlaybackSessionsPerTime: false,
        gbPerTime: false,
        consumptionPerLocation: false,
    },
    jobIds: null
};

export interface AnalyticsRealTimeState {
    readonly data:  AnalyticsRealTimeInfos;
    jobIds: any;
}


