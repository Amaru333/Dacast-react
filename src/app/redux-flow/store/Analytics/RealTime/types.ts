export enum ActionTypes {
    GET_ANALYTICS_REALTIME = "@@analytics_realtime/GET_ANALYTICS_REALTIME"
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
    failed?: boolean;
}

export interface AnalyticsRealTimeViewersTime {
    time: number[];
    data: number[];
    failed? : boolean;
}

export interface AnalyticsRealTimePlaybackTime {
    time: number[];
    data: number[];
    failed?: boolean;
}

export interface AnalyticsRealTimeGbTime {
    time: number[];
    data: number[];
    failed?: boolean;
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


