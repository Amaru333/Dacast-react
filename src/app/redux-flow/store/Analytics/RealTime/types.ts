export enum ActionTypes {
    GET_ANALYTICS_REALTIME_DETAILS = "@@ANALYTICSREALTIME/GET_ANALYTICS_REALTIME_DETAILS",
}

export interface AnalyticsRealTimeInfos {
    concurentViewersPerTime: {
        time: number[];
        data: number[];
    };
    newPlaybackSessionsPerTime: {
        time: number[];
        data: number[];
    };
    gbPerTime: {
        time: number[];
        data: number[];
    };
    consumptionPerLocation:
    {
        data: {
            city: string;
            position: {
                latitude: number;
                longitude: number;
            };
            consumedMB: number;
        }[];
    };
}

interface TopContentData {
    content: string;
    watchTime: number;
    views: number;
    revenueUsd: number;
    revenueEur: number;
}


export const AnalyticsRealTimeInitialState: AnalyticsRealTimeState = {
    data: false,
};

export interface AnalyticsRealTimeState {
    readonly data: false | AnalyticsRealTimeInfos;
}


