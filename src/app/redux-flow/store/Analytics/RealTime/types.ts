export enum ActionTypes {
    GET_ANALYTICS_REALTIME_VIEWERS_TIME = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_VIEWERS_TIME",
    GET_ANALYTICS_REALTIME_PLAYBACK_TIME = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_PLAYBACK_TIME",
    GET_ANALYTICS_REALTIME_GB_TIME = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_GB_TIME",
    GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION",
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

interface TopContentData {
    content: string;
    watchTime: number;
    views: number;
    revenueUsd: number;
    revenueEur: number;
}

export const AnalyticsRealTimeInitialState: AnalyticsRealTimeState = {
    data: {
        concurentViewersPerTime: false,
        newPlaybackSessionsPerTime: false,
        gbPerTime: false,
        consumptionPerLocation: false,
    },
};

export interface AnalyticsRealTimeState {
    readonly data:  AnalyticsRealTimeInfos;
}


