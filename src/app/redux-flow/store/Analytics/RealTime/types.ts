export enum ActionTypes {
    GET_ANALYTICS_REALTIME = "@@analytics_realtime/GET_ANALYTICS_REALTIME"
}

export interface GetAnalyticsRealtimeOptions {
    timePeriod: number;
    liveChannel: string;
}

export interface AnalyticsRealTimeInfos {
    concurentViewersPerTime: AnalyticsRealTimeViewersTime | false;
    playsPerRealTime: AnalyticsRealTimePlayTime | false;
    playtimePerTime: AnalyticsRealTimePlayTime | false;
    playsPerLocation: AnalyticsRealTimeConsumptionLocation | false;
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

export interface AnalyticsRealTimePlayTime {
    time: number[];
    data: number[];
    failed?: boolean;
}

export interface AnalyticsRealTimeGbTime {
    time: number[];
    data: number[];
    failed?: boolean;
}

export const AnalyticsRealTimeInitialState: AnalyticsRealTimeState = false;

export interface AnalyticsRealTimeState {
    readonly data:  AnalyticsRealTimeInfos;
}
